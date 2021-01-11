const CONFIG = require('../config/settings.js')
const { google } = require('googleapis')
const {deleteEvent, createEvent} = require('./helper')

var calendar = google.calendar('v3')
const auth = CONFIG.auth

exports.LunchWorker = () => {
  checkingEventCall()
  setInterval(checkingEventCall, CONFIG.delay)
}


/**
 * Permet de télécharger les calendriers par GoogleAPI
 * @param calendarId Id du calendrier à télécharger
 */
function downloadCalendar (calendarId) {
  return new Promise(resolve => {
    calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: (new Date().toISOString()),
      singleEvents: true,
      maxResults: 1000,
      orderBy: 'startTime'
    }, (err, res) => {
      if (err) {
        logConsole(`Demande API échoué : ${err} \n`)
        return
      }
      resolve(res.data.items)
    })
  })
}

/**
 * Fonction principale de l'application
 * Permet de vérifier si les calendriers sont a jour entre eux
 */
async function checkingEventCall () {
  logConsole('Demarrage du traitement des calendriers') 
  console.time('Traitement calendrier terminé en ')

  for (let i = 1; i <= 4; i++) {
    var groupeText = 'P' + i
    if (i === 4) { groupeText = 'D1' }
    if (i === 5) { groupeText = 'D2' }

    console.log('---> ' + groupeText)
    console.log('Téléchargement des calendrier')
    const eventsPromo = await downloadCalendar(CONFIG.calendarId[`calendar-all-${groupeText}`])
    const eventTutorat = await downloadCalendar(CONFIG.calendarId['calendar-tutorat'])

    eventTutorat.forEach(event => {
      event.description = event.summary
      eventsPromo.push(event)
    })

    const eventsGR1 = await downloadCalendar(CONFIG.calendarId[`calendar-gr1-${groupeText}`])
    const eventsGR2 = await downloadCalendar(CONFIG.calendarId[`calendar-gr2-${groupeText}`])
    const eventsGR3 = await downloadCalendar(CONFIG.calendarId[`calendar-gr3-${groupeText}`])
    const eventsGR4 = await downloadCalendar(CONFIG.calendarId[`calendar-gr4-${groupeText}`])

    console.log('Traitement des différences')
    var gr1 = CheckingBetweenCal(eventsPromo, eventsGR1, '1', CONFIG.calendarId[`calendar-gr1-${groupeText}`])
    var gr2 =CheckingBetweenCal(eventsPromo, eventsGR2, '2', CONFIG.calendarId[`calendar-gr2-${groupeText}`])
    var gr3 =CheckingBetweenCal(eventsPromo, eventsGR3, '3', CONFIG.calendarId[`calendar-gr3-${groupeText}`])
    var gr4 =CheckingBetweenCal(eventsPromo, eventsGR4, '4', CONFIG.calendarId[`calendar-gr4-${groupeText}`])
    var nbrAdd = gr1.nbrAdd + gr2.nbrAdd + gr3.nbrAdd + gr4.nbrAdd
    var nbrSuppr = gr1.nbrSuppr + gr2.nbrSuppr + gr3.nbrSuppr + gr4.nbrSuppr
    console.log(`[Terminé] --> ${nbrAdd} éléments ajoutés et ${nbrSuppr} supprimés\n`)
  }

  console.timeEnd('Traitement calendrier terminé en ')
}

/**
 * Fonction qui permet un de faire les vérifications entre deux calendriers
 * @param {calendar_v3.Ressource$Events} eventsPromo Le calendrier de l'école.
 * @param {calendar_v3.Ressource$Events} eventsGroupe Le calendrier du groupe à vérifier.
 * @param name Le nom du groupe.Traitement calendrier terminé en 
 * @param calendarId L'id du calendrier.
 */
function CheckingBetweenCal (eventsPromo, eventsGroupe, name, calendarId) {
  var nbrSuppr = 0
  eventsGroupe.forEach(function (item) {
    const found = eventsPromo.find(e => e.summary === item.summary && e.description === item.description && e.location === item.location && e.Date === item.Date)
    if (found === undefined) {
      deleteCall(item, calendarId)
      nbrSuppr++
    }
  })

  var nbrAdd = 0
  var regex = RegExp('Gr[0-9]+-' + name)
  var regexBis = RegExp('GC[0-9]+-' + name)
  eventsPromo.forEach(function (item) {
    const found = eventsGroupe.find(e => e.summary === item.summary && e.description === item.description && e.location === item.location && e.Date === item.Date)
    if (found === undefined && (item.description.includes(`Gr${name}`) || item.description.includes(`GC${name}`) || item.description.includes('Promotion') || item.description.match(regex) || item.description.match(regexBis) || item.organizer.displayName === 'Corpo - PAON - TON')) {
      createCall(item, calendarId)
      nbrAdd++
    }
  })

  return {nbrAdd: nbrAdd, nbrSuppr: nbrSuppr}
}

/**
 * Async Call Event
 * @param {calendar_v3.Schema$Event} event Event to add
 * @param int calendarId Event to add
 */
async function createCall (event, calendarId) {
  const result = await createEvent(event, calendarId, calendar, auth)
  console.log(result)
}

/**
 * Async Call Event
 * @param {calendar_v3.Schema$Event} event Event to delete
 * @param int calendarId Event to delete
 */
async function deleteCall (event, calendarId) {
  const result = await deleteEvent(event, calendarId, calendar, auth)
  console.log(result)
}


/**
 * Affiche sur la console
 * @param text Text a ajouter
 */
function logConsole (text) {
  const date = new Date()
  console.log(`${text} - ${date.toISOString()}`)
}
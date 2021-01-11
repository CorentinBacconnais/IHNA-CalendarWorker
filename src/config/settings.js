const fs = require('fs')
const googleAuth = require('google-auth-library')
const path = require('path')

const CALENDAR_ID = {
  'calendar-all-P1': 'uq4s0969b5tbpm3eld34m7qiho@group.calendar.google.com',
  'calendar-gr1-P1': 'hgqprfjgll9qtj3iuekmu7ll7o@group.calendar.google.com',
  'calendar-gr2-P1': 'm9f9nf3lquklgvq0q39k171j88@group.calendar.google.com',
  'calendar-gr3-P1': 'ggo8h9j7abd129r5mmcuefeemo@group.calendar.google.com',
  'calendar-gr4-P1': 'qdrppm737kjkntesl5qbrine5s@group.calendar.google.com',

  'calendar-all-P2': '5gqrig13o56rltik5oc3h0kjds@group.calendar.google.com',
  'calendar-gr1-P2': 'kpq0oqe9pj7nl784unt96lhd0s@group.calendar.google.com',
  'calendar-gr2-P2': 'ovhl6s8kqacsrs9nnsiof38plg@group.calendar.google.com',
  'calendar-gr3-P2': '6ljp3grm9o21uj6o12vdj28p3s@group.calendar.google.com',
  'calendar-gr4-P2': '75robtn9afdgo5cjuig6c68vug@group.calendar.google.com',

  'calendar-all-P3': 'amqdq7rt8fr3kcoevlahsempq0@group.calendar.google.com',
  'calendar-gr1-P3': 'gs0hmj2mibs3i9op5sbm5kpqmk@group.calendar.google.com',
  'calendar-gr2-P3': 'dnflemcvb3v644qa78ndrjslro@group.calendar.google.com',
  'calendar-gr3-P3': 'auklu1ofn77q54j5d47unbdo54@group.calendar.google.com',
  'calendar-gr4-P3': '2821n47526ra4fj3cqidds8pj8@group.calendar.google.com',

  'calendar-all-D1': 'rd1pbji735mnahkrhigvc9qjlg@group.calendar.google.com',
  'calendar-gr1-D1': 'p21c02k7gv7837jaan2cn7s2qg@group.calendar.google.com',
  'calendar-gr2-D1': 'se027f33gc2gd9682jr9ovcu4o@group.calendar.google.com',
  'calendar-gr3-D1': 'a61qo8qvct42m2nvem02tb6gro@group.calendar.google.com',
  'calendar-gr4-D1': '039c4r89un09di2f7li468nh7o@group.calendar.google.com',

  'calendar-all-D2': 'ivkctm4jfo14v2qnrth7n1rh84@group.calendar.google.com', // Pseudo D2
  'calendar-gr1-D2': 'jr5o2fi80nv1tjmdc6ertsn03k@group.calendar.google.com',
  'calendar-gr2-D2': 't8ojh4qmvh056i0im66tnhgui0@group.calendar.google.com',
  'calendar-gr3-D2': 'lormvqh53gtdeqqail94qlvq9g@group.calendar.google.com',
  'calendar-gr4-D2': 'h1kvr9tjfdhtiju3ideu70nt0k@group.calendar.google.com',

  'calendar-tutorat': 'ph5p00rrahuk65i633852cs5kg@group.calendar.google.com'
}
const DELAY = 300000 // = 5 minutes

const TOKEN_PATH = path.resolve('./src/config/token.json')

const googleSecrets = JSON.parse(fs.readFileSync(path.resolve('./src/config/credentials.json'))).installed
var oauth2Client = new googleAuth.OAuth2Client(
  googleSecrets.client_id,
  googleSecrets.client_secret,
  googleSecrets.redirect_uris[0]
)

const token = fs.readFileSync(TOKEN_PATH)
oauth2Client.setCredentials(JSON.parse(token))

module.exports.auth = oauth2Client
module.exports.calendarId = CALENDAR_ID
module.exports.delay = DELAY
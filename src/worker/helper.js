/**
 * Appel API to delete event
 * @param {calendar_v3.Schema$Event} event Event to delete
 * @param int calendarId Event to delete
 */
exports.deleteEvent = (event, calendarId, calendar, auth) => {
  return new Promise(resolve => {
    calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: event.id
    }, function (err) {
      if (err) {
        resolve('There was an error contacting the Calendar service: ' + err)
        return
      }
      resolve('Event deleted')
    })
  })
}

/**
 * Appel API to add new event
 * @param {calendar_v3.Schema$Event} event Event to add
 * @param int calendarId Event to add
 */
exports.createEvent = (event, calendarId, calendar, auth) => {
  return new Promise(resolve => {
    var newEvent = {
      summary: event.summary,
      location: event.location,
      description: event.description,
      start: {
        dateTime: event.start.dateTime,
        timeZone: event.start.timeZone
      },
      end: {
        dateTime: event.end.dateTime,
        timeZone: event.end.timeZone
      },
      attendees: event.attendees,
      reminders: event.reminders
    }
  
    calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: newEvent
    }, function (err) {
      if (err) {
        resolve('There was an error contacting the Calendar service: ' + err)
        return
      }
      resolve('Event created')
    })
  }
  )
}
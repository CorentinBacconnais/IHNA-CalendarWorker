const app = require('./app')
var {portCalendarWorker} = require('../../IHNA_Utils/ihna_port')

app.listen(portCalendarWorker, () => {
  console.log(`App listening in ${portCalendarWorker}`)
})

require('./worker/worker').LunchWorker()
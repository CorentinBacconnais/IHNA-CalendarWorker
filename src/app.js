const express = require('express')
const app = express()
const calendarRoutes = require('./routes/calendar_worker.routes')

app.use(express.json())

app.use('/api/calendarworker', calendarRoutes)

app.use((error, req, res) => {
  res.status(500).json({message: error.message})
})

module.exports = app

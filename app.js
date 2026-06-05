const express = require('express')
const buildingRoutes = require('./src/routes/building.routes')

const app = express()


app.use(express.json())
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/buildings',buildingRoutes)

module.exports = app
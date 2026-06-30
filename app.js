const express = require('express')
const buildingRoutes = require('./src/routes/building.routes')
const houseRoutes = require('./src/routes/house.routes')
const tenantRoutes= require('./src/routes/tenant.routes')
const tenancyRecordRoutes = require('./src/routes/tenancyRecords.routes')
const app = express()



app.use(express.json())
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/buildings', buildingRoutes);
app.use('/buildings/:buildingId/houses' , houseRoutes);
app.use('/tenant', tenantRoutes);
app.use('/tenancyRecords', tenancyRecordRoutes)

module.exports = app
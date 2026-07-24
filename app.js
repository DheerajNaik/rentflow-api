const express = require('express')
const buildingRoutes = require('./src/routes/building.routes')
const houseRoutes = require('./src/routes/house.routes')
const tenantRoutes= require('./src/routes/tenant.routes')
const tenancyRecordRoutes = require('./src/routes/tenancyRecords.routes')
const paymentsRoutes = require('./src/routes/payments.routes')
const expensesRoutes = require('./src/routes/expenses.routes');
const taxesRoutes = require('./src/routes/taxes.routes');
const authRoutes = require('./src/routes/auth.routes');
const {validateToken} = require('./src/middleware/authValidator');
const app = express();
const cors = require('cors')



app.use(cors())
app.use(express.json())
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})


//app.use('/auth',authRoutes);
app.use('/buildings',  buildingRoutes);
app.use('/buildings/:buildingId/houses' ,validateToken, houseRoutes);
app.use('/tenants', validateToken,tenantRoutes);
app.use('/tenancy-records',validateToken, tenancyRecordRoutes);
app.use('/payments',validateToken, paymentsRoutes);
app.use('/expenses',validateToken,expensesRoutes);
app.use('/tax',validateToken,taxesRoutes);

module.exports = app
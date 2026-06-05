const express = require('express')
const router = express.Router()
const buildingController = require('../controllers/building.controller')




router.post('/', buildingController.createBuilding)
module.exports = router
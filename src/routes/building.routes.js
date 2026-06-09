const express = require('express')
const router = express.Router()
const buildingController = require('../controllers/building.controller')
const {validateBuilding} = require('../middleware/buildingValidator');

router.post('/', validateBuilding, buildingController.createBuilding)
router.get('/',buildingController.getAllBuildings);
router.get('/:id',buildingController.getBuildingById);


module.exports = router
const express = require('express');
const router = express.Router({ mergeParams: true });
const houseController = require('../controllers/house.controller');
const {validateHouse}= require('../middleware/houseValidator')


router.post('/', validateHouse, houseController.createHouse);
router.get('/',houseController.getAllHousesByBuilding)

module.exports = router;
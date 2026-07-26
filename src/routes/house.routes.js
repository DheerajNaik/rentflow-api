const express = require('express');
const router = express.Router({ mergeParams: true });
const houseController = require('../controllers/house.controller');
const {validateHouse, validateHouseUpdate}= require('../middleware/houseValidator');
const uploadBill = require('../middleware/upload.multer')


router.post('/', validateHouse, houseController.createHouse);
router.get('/',houseController.getAllHousesByBuilding);
router.get('/:id',houseController.getHouseById);
router.put('/:id',validateHouseUpdate, houseController.updateHouseById);
router.delete('/:id', houseController.deleteHouseById);
router.put('/:id/restore' ,houseController.restoreHouseById);
router.post('/:id/upload', uploadBill.single("image"),houseController.uploadElectricityBill)
router.delete('/:id/deleteImage', houseController.deleteElectricityBill)

module.exports = router;
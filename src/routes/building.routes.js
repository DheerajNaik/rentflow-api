const express = require('express')
const router = express.Router()
const buildingController = require('../controllers/building.controller')
const {validateBuilding, validateBuildingUpdate} = require('../middleware/buildingValidator');
const uploadBill = require('../middleware/upload.multer')



router.post('/', validateBuilding, buildingController.createBuilding)
router.get('/',buildingController.getAllBuildings);
router.get('/:id',buildingController.getBuildingById);
router.put('/:id',validateBuildingUpdate, buildingController.updateBuildingById);
router.delete('/:id', buildingController.deleteBuildingById);
router.put('/:id/restore', buildingController.restoreBuildingById);
router.post('/:id/upload',uploadBill.single('image'), buildingController.uploadCaveryBill);
router.post('/:id/deleteImage',buildingController.deleteCaveryBill);
module.exports = router

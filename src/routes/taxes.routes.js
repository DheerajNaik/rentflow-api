const express = require('express');
const router = express.Router();
const taxesController = require('../controllers/taxes.controller');
const {validateTaxCreationRecord, validateTaxUpdationRecord} = require('../middleware/taxesValidator')
const uploadBill = require('../middleware/upload.multer')

router.post('/', validateTaxCreationRecord, taxesController.createTaxRecord);
router.get('/', taxesController.getAllTaxRecords);
router.put('/:id', validateTaxUpdationRecord, taxesController.updateTaxRecordById);
router.delete('/:id', taxesController.deleteTaxRecordById);
router.post('/:id/upload',uploadBill.single('image'),taxesController.uploadTaxReceipt)
router.delete('/:id/deleteImage', taxesController.deleteTaxReceipt)
module.exports = router
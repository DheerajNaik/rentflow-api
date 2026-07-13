const express = require('express');
const router = express.Router();
const taxesController = require('../controllers/taxes.controller');
const {validateTaxCreationRecord, validateTaxUpdationRecord} = require('../middleware/taxesValidator')




router.post('/', validateTaxCreationRecord, taxesController.createTaxRecord);
router.get('/', taxesController.getAllTaxRecords);
router.put('/:id', validateTaxUpdationRecord, taxesController.updateTaxRecordById);
router.delete('/:id', taxesController.deleteTaxRecordById);

module.exports = router
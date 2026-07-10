const express = require('express');
const router = express.Router({ mergeParams: true });
const tenancyRecordsController = require('../controllers/tenancyRecords.controller');
const {validateTenancyRecord,validateUpdateTenancyRecord}= require('../middleware/tenancyRecordValidator')


router.post('/',validateTenancyRecord,tenancyRecordsController.createTenancyRecords);
router.get('/', tenancyRecordsController.getAllTenancyRecords);
router.get('/active', tenancyRecordsController.getAllActiveTenancyRecords);
router.get('/:id', tenancyRecordsController.getTenancyRecordById);
router.put('/:id',validateUpdateTenancyRecord, tenancyRecordsController.updateTenancyRecordById );
router.put('/:id/moveout',tenancyRecordsController.updateMoveoutDate);
router.get('/:id/payments', tenancyRecordsController.getPaymentsByTenancyId)

module.exports = router;
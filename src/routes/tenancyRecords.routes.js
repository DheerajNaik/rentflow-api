const express = require('express');
const router = express.Router({ mergeParams: true });
const tenancyRecordsController = require('../controllers/tenancyRecords.controller');
const {validateTenancyRecord,validateUpdateTenancyRecord}= require('../middleware/tenancyRecordValidator')
const uploadBill = require('../middleware/upload.multer')


router.post('/',validateTenancyRecord,tenancyRecordsController.createTenancyRecords);
router.get('/', tenancyRecordsController.getAllTenancyRecords);
router.get('/active', tenancyRecordsController.getAllActiveTenancyRecords);
router.get('/:id', tenancyRecordsController.getTenancyRecordById);
router.put('/:id',validateUpdateTenancyRecord, tenancyRecordsController.updateTenancyRecordById );
router.put('/:id/moveout',tenancyRecordsController.updateMoveoutDate);
router.get('/:id/payments', tenancyRecordsController.getPaymentsByTenancyId)
router.post('/:id/upload',uploadBill.single('image'), tenancyRecordsController.uploadAgreement)
router.delete('/:id/deleteImage', tenancyRecordsController.deleteAgreement)

module.exports = router;
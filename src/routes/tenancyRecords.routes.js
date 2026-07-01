const express = require('express');
const router = express.Router({ mergeParams: true });
const tenancyRecordsController = require('../controllers/tenancyRecords.controller');
const {validateTenancyRecord}= require('../middleware/tenancyRecordValidator')


router.post('/',validateTenancyRecord,tenancyRecordsController.createTenancyRecords);
router.get('/', tenancyRecordsController.getAllTenancyRecords);
router.get('/active', tenancyRecordsController.getAllActiveTenancyRecords);
router.get('/:id', tenancyRecordsController.getTenancyRecordById)

module.exports = router;
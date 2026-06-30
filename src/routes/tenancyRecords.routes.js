const express = require('express');
const router = express.Router({ mergeParams: true });
const tenancyRecordsController = require('../controllers/tenancyRecords.controller');
const {validateTenancyRecord}= require('../middleware/tenancyRecordValidator')


router.post('/',validateTenancyRecord,tenancyRecordsController.createTenancyRecords)

module.exports = router;
const express = require('express');
const router = express.Router({mergeParams:true});
const paymentsController = require('../controllers/payments.controller');
const {validatePaymentsRecord,validateUpdatePaymentsRecord} = require('../middleware/paymentsValidator');




router.post('/',validatePaymentsRecord, paymentsController.createPaymentDetails);
router.put('/:id',validateUpdatePaymentsRecord, paymentsController.updatePaymentDetails);

module.exports = router;

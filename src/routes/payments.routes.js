const express = require('express');
const router = express.Router({mergeParams:true});
const paymentsController = require('../controllers/payments.controller');
const {validatePaymentsRecord,validateUpdatePaymentsRecord} = require('../middleware/paymentsValidator');




router.post('/',validatePaymentsRecord, paymentsController.createPaymentDetails);
router.put('/:id',validateUpdatePaymentsRecord, paymentsController.updatePaymentDetails);
router.get('/', paymentsController.getAllPayments);
router.get('/unpaid', paymentsController.getAllUnpaidPayments);
router.delete('/:id', paymentsController.deletePayment);


module.exports = router;

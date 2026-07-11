const express = require('express');
const router = express.Router({mergeParams:true});
const expensesController = require('../controllers/expenses.controller');
const { validateExpensesCreationRecord, validateExpensesUpdationRecord } = require('../middleware/expensesValidator');



router.post('/',validateExpensesCreationRecord, expensesController.createExpense);
router.get('/',expensesController.getAllExpenses);
router.put('/:id',validateExpensesUpdationRecord, expensesController.editExpenseById);
router.delete('/:id',expensesController.deleteExpenseById);



module.exports= router

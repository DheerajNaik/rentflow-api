const expensesModel = require('../models/expenses.model');


const createExpense= async(req, res) => {

    try {
        const data = req.body
        const { building_id, house_id, amount_paid, expense_date, category, description } = req.body;
        const filteredFields = Object.fromEntries(Object.entries(data).filter(([k , v])=> v !== undefined ));
        const result = await expensesModel.createExpense(filteredFields)
        res.status(201).json({ success: true, data: result });        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllExpenses= async(req, res) => {

    try {
        const result = await expensesModel.getAllExpenses();
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


const editExpenseById = async(req, res)=>{
    try
    {
         const id = req.params.id;
         const {house_id, amount_paid, expense_date, category , description}= req.body;
         const allowedFields = {house_id,amount_paid, expense_date, category , description}
         const updatedItems =  Object.fromEntries(Object.entries(allowedFields).filter(([key,value])=>value !== undefined));
         const result = await expensesModel.editExpenseById(id,updatedItems);
         if(result.affectedRows===0){
           return res.status(404).json({success:false, message: "No such data found"});
        }
         res.status(200).json({success:true , data : result})
        }
        catch (error) {
         res.status(500).json({success: false, message : error.message})
        }
        
}
const deleteExpenseById = async(req, res)=> {
         try {
               const id = req.params.id;
               const result = await expensesModel.deleteExpenseById(id);     
               if (result === null) {
                  return res.status(404).json({ success: false, message: "Data not found" })
               }
               if (result === "Already deleted") {
                  return res.status(400).json({ success: false, message: "invalid request: This is already deactivated" })
               }
               res.status(200).json({ success: true, data: result })
            }
            catch (error) {
               res.status(500).json({ success: false, message: error.message })
            }
}



module.exports = { getAllExpenses, createExpense,editExpenseById,deleteExpenseById }
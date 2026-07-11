const Joi = require('joi');

const expensesCreationSchema = Joi.object({
  building_id: Joi.string().required(),
  house_id: Joi.string().optional().allow('', null),
  amount_paid: Joi.number().min(0).max(1000000).required(),
  expense_date: Joi.date().required(),
  category: Joi.string().required(),
  description: Joi.string().required()
})

const updateExpensesSchema = Joi.object({
  amount_paid: Joi.number().min(0).max(1000000).optional(),
  expense_date: Joi.date().optional(),
  category: Joi.string().optional(),
  description: Joi.string().optional()
})

const validateExpensesCreationRecord = async(req,res,next)=>{
     const {error} = expensesCreationSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();
}

const validateExpensesUpdationRecord = async (req,res,next)=>{
   const {error}= updateExpensesSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();

}

module.exports= {validateExpensesCreationRecord,validateExpensesUpdationRecord}
const Joi = require('joi');

const paymentRecordSchema = Joi.object({
  tenancy_record_id: Joi.string().required(),
  amount_paid: Joi.number().min(0).max(1000000).required(),
  payment_date: Joi.date().required(),
  payment_for_month: Joi.number().min(1).max(12).required().allow('', null),
  payment_for_year: Joi.number().min(2000).max(3000).required().allow('', null),
  payment_mode: Joi.string().optional().allow('', null),
  paid_to_account: Joi.string().optional().allow('', null),
  balance: Joi.number().min(0).max(1000000).required(),
  notes: Joi.string().optional().allow('', null)
})

const updatePaymentRecordSchema = Joi.object({
  amount_paid: Joi.number().min(0).max(1000000).optional(),
  payment_date: Joi.date().optional(),
  payment_for_month: Joi.number().min(1).max(12).optional().allow('', null),
  payment_for_year: Joi.number().min(2000).max(3000).optional().allow('', null),
  payment_mode: Joi.string().optional().allow('', null),
  paid_to_account: Joi.string().optional().allow('', null),
  balance: Joi.number().min(0).max(1000000).optional(),
  notes: Joi.string().optional().allow('', null)
})

const validatePaymentsRecord = async(req,res,next)=>{
     const {error} = paymentRecordSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();
}

const validateUpdatePaymentsRecord = async (req,res,next)=>{
   const {error}= updatePaymentRecordSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();

}

module.exports= {validatePaymentsRecord,validateUpdatePaymentsRecord}
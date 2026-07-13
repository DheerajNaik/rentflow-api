const Joi = require('joi');

const taxRecordCreationSchema = Joi.object({
  building_id: Joi.string().required(),
  tax_amount_paid: Joi.number().min(0).max(1000000).required(),
  tax_paid_date: Joi.date().required(),
  tax_year: Joi.string().required(),
  bbmp_tax_account_number: Joi.string().required(),
  receipt_url : Joi.string().optional().allow('', null),
  notes : Joi.string().optional().allow('', null),

})

const updatetaxRecordSchema = Joi.object({
  tax_amount_paid: Joi.number().min(0).max(1000000).optional(),
  tax_paid_date: Joi.date().optional(),
  tax_year: Joi.string().optional(),
  bbmp_tax_account_number: Joi.string().required(),
  receipt_url : Joi.string().optional().allow('', null),
  notes : Joi.string().optional().allow('', null),
})

const validateTaxCreationRecord = async(req,res,next)=>{
     const {error} = taxRecordCreationSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();
}

const validateTaxUpdationRecord = async (req,res,next)=>{
   const {error}= updatetaxRecordSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();
}

module.exports= {validateTaxCreationRecord,validateTaxUpdationRecord}
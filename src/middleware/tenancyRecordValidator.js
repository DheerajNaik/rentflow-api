const Joi = require ('joi')

const tenancyRecordSchema = Joi.object({
  tenant_id: Joi.string().required(),
  house_id: Joi.string().required(),
  move_in_date: Joi.date().required(),
  number_of_occupants: Joi.number().min(0).max(10).required().allow('', null),
  minimum_stay_months: Joi.number().min(0).optional(),
  agreement_done: Joi.boolean().optional(),
  agreement_expiry_date: Joi.date().optional().allow(null),
  painting_charges: Joi.number().min(0).optional().allow(null),
  agreement_file_url : Joi.string().optional().allow('', null),
  notes: Joi.string().optional().allow('', null)
})
const updateTenancyRecordSchema = Joi.object({
  move_in_date: Joi.date().optional(),
  number_of_occupants: Joi.number().min(0).max(10).optional().allow('', null),
  minimum_stay_months: Joi.number().min(0).optional(),
  agreement_done: Joi.boolean().optional(),
  agreement_expiry_date: Joi.date().optional().allow(null),
  painting_charges: Joi.number().min(0).optional().allow(null),
  agreement_file_url : Joi.string().optional().allow('', null),
  notes: Joi.string().optional().allow('', null)
})

const validateTenancyRecord = async(req,res,next)=>{
     const {error} = tenancyRecordSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();
}

const validateUpdateTenancyRecord = async (req,res,next)=>{
   const {error}= updateTenancyRecordSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next();

}

module.exports = {validateTenancyRecord,validateUpdateTenancyRecord}
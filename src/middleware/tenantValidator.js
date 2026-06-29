const Joi = require('joi')

const tenantSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  phone_number: Joi.string().min(10).max(20).required(),
  aadhar_number: Joi.string().min(10).max(20).required(),
  emergency_contact_name: Joi.string().min(2).max(100).optional().allow('', null),
  emergency_contact_number: Joi.number().min(0).optional().allow('', null),
  notes: Joi.string().min(0).max(1000).optional().allow('', null),
})

const tenantUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  phone_number: Joi.string().min(10).max(20).optional(),
  aadhar_number: Joi.string().min(10).max(20).optional(),
  emergency_contact_name: Joi.string().min(2).max(100).optional().allow('', null),
  emergency_contact_number: Joi.number().min(0).optional().allow('', null),
  notes: Joi.string().optional().allow('', null),
})

// what .validate returns
// {
//   error: {
//     details: [
//       { message: '"name" is required', path: ['name'] },
//       { message: '"phone_number" is required', path: ['phone_number'] }
//     ]
//   },
//   value: {}
// }

const validateTenant = async(req,res,next)=>{
     const {error} = tenantSchema.validate(req.body , {abortEarly:false})
     if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
     }
   next()
}

const validateUpdateTenant = async (req,res,next)=>{
       if(Object.keys(req.body).length === 0 ){
        return res.status(400).json({success: false, error : "Atleast one field required"})
       }
       const {error}= tenantUpdateSchema.validate(req.body, {abortEarly: false});
       if(error){
          const messages =   error.details.map(item=> item.message);
           return res.status(400).json({success:false, error : messages})
       }
       next();
}
module.exports ={validateTenant, validateUpdateTenant}


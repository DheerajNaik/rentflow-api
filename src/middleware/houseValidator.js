const Joi = require ('joi')


const houseSchema = Joi.object({
  building_id : Joi.string().required(),
  house_name: Joi.string().required(),
  electricity_meter_account_number: Joi.string().optional().allow('', null),
  electricity_meter_rr_number: Joi.string().optional().allow('', null),
  rent_amount: Joi.number().min(0).required(),
})

const houseUpdateSchema = Joi.object({
  building_id : Joi.string().optional(),
  house_name: Joi.string().min(3).max(255).optional(),
  electricity_meter_account_number: Joi.string().optional().allow('', null),
  electricity_meter_rr_number: Joi.string().optional().allow('', null),
  rent_amount: Joi.number().min(0).optional(),
})

const validateHouse = (req, res, next)=>{
  const {error} = houseSchema.validate(req.body , {abortEarly:false})
  if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
  }
   next()
}


const validateHouseUpdate = async (req,res,next )=>{
     if(Object.keys(req.body).length===0){
      return res.status(400).json({success: false, message : "No fields edited!!"})
     }
     const {error} = houseUpdateSchema.validate(req.body , {abortEarly:false})
  if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
  }
  
   next()
}
module.exports = {validateHouse,validateHouseUpdate}
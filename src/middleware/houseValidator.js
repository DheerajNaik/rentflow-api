const Joi = require ('joi')


const houseSchema = Joi.object({
  house_name: Joi.string().min(3).max(255).required(),
  electricity_meter_account_number: Joi.string().optional().allow('', null),
  electricity_meter_rr_number: Joi.string().optional().allow('', null),
  rent_amount: Joi.number().min(0).required(),
})


const validateHouse = (req, res, next)=>{
  const {error} = houseSchema.validate(req.body , {abortEarly:false})
  if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({success: false, messages})
  }
   next()
}

module.exports = {validateHouse}
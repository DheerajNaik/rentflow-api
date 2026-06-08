const Joi = require('joi')


const buildingSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  address: Joi.string().min(5).max(500).required(),
  city: Joi.string().min(2).max(100).required(),
  yearly_tax: Joi.number().min(0).required(),
  cauvery_water_account_number: Joi.string().optional().allow('', null),
  cauvery_water_bill_image: Joi.string().uri().optional().allow('', null)
})

const validateBuilding = (req, res, next)=>{
  const {error} = buildingSchema.validate(req.body , {abortEarly:false})
  if(error){
         const messages =   error.details.map(detail=>detail.message);
         return res.status(400).json({sucess: false, messages})
  }
   next()
}

module.exports = {validateBuilding}
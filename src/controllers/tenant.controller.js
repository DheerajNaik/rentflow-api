const tenantModel = require('../models/tenant.model');

const createTenant = async(req, res)=>{
   try{
      const {name,phone_number,aadhar_number,emergency_contact_name,emergency_contact_number,notes}= req.body;
      const result = await tenantModel.createTenant({name,phone_number,aadhar_number,emergency_contact_name,emergency_contact_number,notes}) 
       res.status(201).json({success: true, message: result});

   }catch(error){
       res.status(500).json({success: false, message: error.message});
   }
}

const getAllTenants = async(req,res)=>{
    try{
       const result = await tenantModel.getAllTenants();
       res.status(200).json({success:true, message : result})   
    }catch(error){
       res.status(500).json({success:false, message : error.message})   

    }
}

const getTenantById = async(req,res)=>{
      // return error if tenant id is wrong,
      try {
        const id = req.params.id;
        const result = await tenantModel.getTenantById(id);
        if(result === "Invalid Request") {
            return res.status(401).json({success: false, message : "Invalid request"});
        }
        res.status(200).json({success: true, message : result })
      }
       catch(error){
        res.status(200).json({success: false, message : error.message })
      }

}
module.exports = {createTenant,getAllTenants,getTenantById}



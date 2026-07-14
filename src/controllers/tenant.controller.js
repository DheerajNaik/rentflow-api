const tenantModel = require('../models/tenant.model');

const createTenant = async(req, res) => {
   try{
      const {name,phone_number,aadhar_number,emergency_contact_name,emergency_contact_number,notes}= req.body;
      const filteredFields = Object.fromEntries(Object.entries({name,phone_number,aadhar_number,emergency_contact_name,emergency_contact_number,notes}).filter(([k , v])=> v !== undefined ));
      const result = await tenantModel.createTenant(filteredFields) 
      res.status(201).json({success: true, data: result});

   }catch(error){
      res.status(500).json({success: false, message: error.message});
   }
}

const getAllTenants = async(req,res)=>{
    try{
       const result = await tenantModel.getAllTenants();
       res.status(200).json({success:true, data : result})   
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

const updateTenantById = async(req,res)=>{
     try {
        const { name, phone_number,aadhar_number,emergency_contact_name,emergency_contact_number,notes }  = req.body;
        const allowedFields = { name, phone_number,aadhar_number,emergency_contact_name,emergency_contact_number,notes }
        const updatedFields = Object.fromEntries(Object.entries(allowedFields).filter(([_, value]) => value !== undefined));
        const id = req.params.id;
        const result = await tenantModel.updateTenantById(id,updatedFields)
  
        if(result.affectedRows===0){
           return res.status(404).json({success:false, message: "No such data found"});
        }
         res.status(200).json({success:true , data : result})
        }
        catch (error) {
         res.status(500).json({success: false, message : error.message})

        }
}

const deleteTenantById = async (req, res)=>{
   try {
      const id = req.params.id;
      const result = await tenantModel.deleteTenantById(id);
      if (result === null) {
         return res.status(404).json({ success: false, message: "Data not found" })
      }
      if (result === "Already deleted") {
         return res.status(404).json({ success: false, message: "invalid request: This is already deactivated" })
      }
      res.status(200).json({ success: true, data: result })
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}
const restoreTenantById = async (req, res)=>{
   try {
      const id = req.params.id;
      const result = await tenantModel.restoreTenantById(id);
      if (result === null) {
         return res.status(404).json({ success: false, message: "Data not found" })
      }
      if (result === "Already restored") {
         return res.status(404).json({ success: false, message: "invalid request: This is already activated" })
      }
      res.status(200).json({ success: true, data: result })
   }
   catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}

module.exports = {createTenant,getAllTenants,getTenantById, updateTenantById, deleteTenantById, restoreTenantById}



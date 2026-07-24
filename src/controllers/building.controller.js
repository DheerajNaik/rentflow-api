
const buildingModel = require('../models/building.model')
const {uploadToCloudinary} = require('../config/cloudinary.helper')
const cloudinary = require('../config/cloudinary')

const createBuilding = async (req, res) => {

    try {    
        const { name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image } = req.body
        const filteredFields = Object.fromEntries(Object.entries({ name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image }).filter(([k , v])=> v !== undefined ));
        
        const building = await buildingModel.createBuilding(filteredFields)
        res.status(201).json({ success: true, data: building })

    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getAllBuildings = async(req,res)=>{
     try {
        const result = await buildingModel.getAllBuildings()
        res.status(200).json({success: true, data:result})
     }
     catch(error){
         res.status(500).json({ success: false, message: error.message })
     }
}

const getBuildingById = async (req,res)=>{
    try{
         const id = req.params.id;     
         const building = await buildingModel.getBuildingById(id);
         if(!building){
            return res.status(404).json({success: false, message : "No such data found"})
         }
         res.status(200).json({success: true, data : building })

    }catch(error){
         res.status(500).json({success: false, message : error.message})
    }
}

const updateBuildingById = async (req, res)=>{
     try {
        const { name, address, city,yearly_tax, cauvery_water_account_number,cauvery_water_bill_image }  = req.body;
        const allowedFields = { name, address, city,yearly_tax, cauvery_water_account_number,cauvery_water_bill_image }
        const updatedFields = Object.fromEntries(Object.entries(allowedFields).filter(([_, value]) => value !== undefined));
        const id = req.params.id;
        const result = await buildingModel.updateBuildingById(id, updatedFields);
        
        if(result.affectedRows===0){
           return res.status(404).json({success:false, message: "No such data found"});
        }
         res.status(200).json({success:true , data : result})
     }
     catch (error){
        res.status(500).json({success: false, message : error.message})
     }
}

const deleteBuildingById = async (req, res) => {
        try {
        const id = req.params.id;
        const result = await buildingModel.deleteBuildingById(id)
        if(result === null ){
            return res.status(404).json({success: false, message : "Data not found"})
        }
        if( result === "Already deleted" ){
           return res.status(404).json({success: false, message : "invalid request: This is already deactivated"})
        }
        res.status(200).json({success:true, message : result})
        } 
        catch (error) {
        res.status(500).json({ success: false, message: error.message })
        }
}

const restoreBuildingById = async (req, res) => {
       try {
          const id = req.params.id;
          const result = await buildingModel.restoreBuildingById(id)
        if(result === null ){
            return res.status(404).json({success: false, message : "Data not found"})
        }
        if( result === "Already restored" ){
           return res.status(400).json({success: false, message : "invalid request: This is already activated"})
        }
        res.status(200).json({success:true, message : result})
        } 
       
       catch(error){
           res.status(500).json({success : false, message : error.message })
       }
}

const uploadCaveryBill= async(req, res)=>{
    try{
      const buffer = req.file.buffer
      if(!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
      const image = req.file;
      const buildingId = req.params.id;
      const data = await uploadToCloudinary(buffer,buildingId);
      const url = data.secure_url;
      const public_id = data.public_id;
      const result = await buildingModel.uploadCaveryBill(url,public_id,buildingId);
    //  console.log(result)
      res.status(200).json({success: true, data : result})
      
}catch(error){
    res.status(500).json({success: false, message : error.message})
}  
}
const deleteCaveryBill = async (req,res)=>{
    try
    {
        const id = req.params.id;
        const {cauvery_water_bill_image,cauvery_water_bill_image_cloudinary_public_id} = await buildingModel.getBuildingById(id);
        if (!cauvery_water_bill_image_cloudinary_public_id) {
           return res.status(400).json({ success: false, message: 'No image to delete' })
             }
        const result = await cloudinary.uploader.destroy(cauvery_water_bill_image_cloudinary_public_id);
        
        if(result.result === 'ok'){
           const deleteFromDb = await buildingModel.deleteCaveryBill(id);
           
           res.status(200).json({success:true, message : "Image_deleted"})
        }else{
           res.status(404).json({success:false,message : "Data not Found"})
        }
       
    }catch(error){
    res.status(500).json({success: false, message : error.message})
     
    }
}

module.exports = { createBuilding, getAllBuildings, getBuildingById, updateBuildingById, deleteBuildingById , restoreBuildingById,uploadCaveryBill,deleteCaveryBill}

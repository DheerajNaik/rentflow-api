const taxModel = require('../models/taxes.model');
const {uploadToCloudinary} = require('../config/cloudinary.helper')
const cloudinary = require('../config/cloudinary')


const createTaxRecord= async(req, res) => {

    try {
        const data = req.body
        const { building_id, tax_amount_paid, tax_paid_date, tax_year, bbmp_tax_account_number, receipt_url,notes } = req.body;
        const filteredFields = Object.fromEntries(Object.entries({ building_id, tax_amount_paid, tax_paid_date, tax_year, bbmp_tax_account_number, receipt_url,notes }).filter(([k , v])=> v !== undefined ));
        const result = await taxModel.createTaxRecord(filteredFields)
        res.status(201).json({ success: true, data: result });        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllTaxRecords= async(req, res) => {

    try {
        const result = await taxModel.getAllTaxRecords();
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


const updateTaxRecordById = async(req, res)=>{
    try
    {
         const id = req.params.id;
         const {tax_amount_paid, tax_paid_date, tax_year, bbmp_tax_account_number, receipt_url,notes}= req.body;
         const allowedFields = { tax_amount_paid, tax_paid_date, tax_year, bbmp_tax_account_number, receipt_url,notes}
         const updatedItems =  Object.fromEntries(Object.entries(allowedFields).filter(([key,value])=>value !== undefined));
         const result = await taxModel.updateTaxRecordById(id,updatedItems);
         if(result.affectedRows===0){
           return res.status(404).json({success:false, message: "No such data found"});
        }
         res.status(200).json({success:true , data : result})
        }
        catch (error) {
         res.status(500).json({success: false, message : error.message})
        }
        
}
const deleteTaxRecordById = async(req, res)=> {
         try {
               const id = req.params.id;
               const result = await taxModel.deleteTaxRecordById(id);     
               if (result === null) {
                  return res.status(404).json({ success: false, message: "Data not found" })
               }
               res.status(200).json({ success: true, data: result })
            }
            catch (error) {
               res.status(500).json({ success: false, message: error.message })
            }
}

const uploadTaxReceipt= async(req, res)=>{
    try{
      if(!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
      const buffer = req.file.buffer
      const image = req.file;
      const id = req.params.id;
      const data = await uploadToCloudinary(buffer,id);
      const url = data.secure_url;
      const public_id = data.public_id;
      const result = await taxModel.uploadTaxReceipt(url,public_id,id);
      res.status(200).json({success: true, data : result})
      
}catch(error){
    res.status(500).json({success: false, message : error.message})
}  
}
const deleteTaxReceipt = async (req,res)=>{
    try
    {
        const id = req.params.id;
        const {receipt_url,tax_image_cloudinary_public_id} = await taxModel.getTaxById(id);
        if (!tax_image_cloudinary_public_id) {
           return res.status(400).json({ success: false, message: 'No image to delete' })
             }
        const result = await cloudinary.uploader.destroy(tax_image_cloudinary_public_id);
        
        if(result.result === 'ok'){
           const deleteFromDb = await taxModel.deleteTaxReceipt(id);
           
           res.status(200).json({success:true, message : "Image_deleted"})
        }else{
           res.status(404).json({success:false,message : "Data not Found"})
        }
       
    }catch(error){
    res.status(500).json({success: false, message : error.message})
     
    }
}

module.exports = { getAllTaxRecords, createTaxRecord,updateTaxRecordById,deleteTaxRecordById,uploadTaxReceipt,deleteTaxReceipt }
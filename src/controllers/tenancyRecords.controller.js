const tenancyRecordsModel = require('../models/tenancyRecords.model');

const createTenancyRecords = async(req, res)=>{
    try {
        const {tenant_id, house_id, move_in_date,  number_of_occupants , minimum_stay_months, agreement_done , agreement_expiry_date, painting_charges, notes, agreement_file_url}= req.body;
        const newItems = {tenant_id, house_id, move_in_date,  number_of_occupants , minimum_stay_months, agreement_done , agreement_expiry_date, painting_charges, notes, agreement_file_url}
        const result =  await tenancyRecordsModel.createTenancyRecord(newItems);
        if (result==="House is already occupied by someone"){
            return res.status(400).json({success : false, message : result})
        }
        res.status(201).json({success : true,message : result, warning : result.warning, })
    }
    catch (error){
        res.status(500).json({success: false, message : error.message})
    }
}

const getAllTenancyRecords = async (req, res)=>{
    try{
       const result = await tenancyRecordsModel.getAllTenancyRecords();
      
       res.status(200).json({success: true, data : result}) 
    }
    catch(error){
       res.status(500).json({success: false , message : error.message})
    }
}

const getAllActiveTenancyRecords = async(req, res)=>{
    try {
      const result = await tenancyRecordsModel.getAllActiveTenancyRecords();
      res.status(200).json({success: true, data : result})
    }
    catch(error){
       res.status(500).json({success: false , message : error.message})
    }
}

const getTenancyRecordById =async (req, res)=>{

    try {
        const id = req.params.id;
        const result =  await tenancyRecordsModel.getTenancyRecordById(id);
        if(result === "Invalid Request"){
         return  res.status(404).json({success: false, message : result})
            
        }
        res.status(200).json({success: true, data : result})
        
    }
    catch(error){
       res.status(500).json({success: false , message : error.message})
    }
}

const updateTenancyRecordById = async(req, res)=>{
    try{
    const id = req.params.id;
    const {move_in_date,  number_of_occupants , minimum_stay_months, agreement_done , agreement_expiry_date, painting_charges, notes, agreement_file_url}= req.body;
    const items = {move_in_date,  number_of_occupants , minimum_stay_months, agreement_done , agreement_expiry_date, painting_charges, notes, agreement_file_url};
    const realData =  Object.fromEntries(Object.entries(items).filter(([key,value])=>value !==undefined));
    const result = await tenancyRecordsModel.updateTenancyRecordById(id,realData);
        if (result.affectedRows === 0) {
         return res.status(404).json({ success: false, message: 'Record not found' })
           }
        res.status(200).json({success: true, data : result})
    }
    catch(error){
       res.status(500).json({success: false , message : error.message})
    }
}
const updateMoveoutDate = async(req, res)=>{
    try{

    
    const id = req.params.id;
    console.log(req.body,"this is req")
    const {move_out_date} = req.body;
  //  console.log(date)
    const result =  await tenancyRecordsModel.updateMoveoutDate(id,move_out_date);
    if (result === "Invalid request") {
        return res.status(404).json({ success: false, message: result })
    }
    if (result === "Tenant has already moved out") {
        return res.status(404).json({ success: false, message: result })
    }
    if (result === "Invalid_date") {
        return res.status(404).json({ success: false, message: result })
    }
    res.status(200).json({success: true, data : result})
    }
    catch(error){
        res.status(500).json({success: false, message : error.message})
    }

}
module.exports = {createTenancyRecords,getAllTenancyRecords, getAllActiveTenancyRecords, getTenancyRecordById, updateTenancyRecordById,updateMoveoutDate} 
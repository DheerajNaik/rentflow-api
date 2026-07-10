const paymentRecordModel = require('../models/payments.model');


const createPaymentDetails = async(req, res)=>{
   try {
       const data = req.body
        const { tenancy_record_id, amount_paid, payment_date, payment_for_month, payment_for_year, payment_mode, paid_to_account, balance, notes }= data;
        //remove all undefined items from object;
        const filteredFields = Object.fromEntries(Object.entries(data).filter(([k , v])=> v !== undefined ));
        const result = await paymentRecordModel.createPaymentDetails(filteredFields);
        res.status(201).json({ success: true, data: result })
        
   }
   catch(error){
    res.status(500).json({success:false, message : error.message})
   }
}

const updatePaymentDetails = async(req, res)=>{
   try {
        const id = req.params.id;
        const data = req.body
        const {  amount_paid, payment_date, payment_for_month, payment_for_year, payment_mode, paid_to_account, balance, notes }= data;
        const allowedFields = { amount_paid, payment_date, payment_for_month, payment_for_year, payment_mode, paid_to_account, balance, notes }
        const filteredFields = Object.fromEntries(Object.entries(allowedFields).filter(([k , v])=> v !== undefined ));
        const result = await paymentRecordModel.updatePaymentDetails(id,filteredFields);
        if(result.affectedRows ===0 ){
            return res.status(404).json({ success: false, message : "Data Not Found" })
        }
        res.status(200).json({ success: true, data: result })    
   }
   catch(error){
    res.status(500).json({success:false, message : error.message})
   }
}

const getAllPayments = async (req, res)=>{
    try {
         const result =  await paymentRecordModel.getAllPayments();
         if(result.length ===0 ){
            return res.status(200).json({ success: false, message : "No Data found" })  
         }
         res.status(200).json({ success: true, data : result })
    }
    catch(error){
    res.status(500).json({success:false, message : error.message})
    }
}

const getAllUnpaidPayments = async (req,res)=>{
      try {
          const result = await paymentRecordModel.getAllUnpaidPayments();
           if(result.length ===0 ){
            return res.status(200).json({ success: false, message : "No Data found" })  
         }
         res.status(200).json({ success: true, data : result })

      }
      catch(error) {
          res.status(500).json({success:false, message : error.message})
      }
}
const deletePayment = async (req,res)=>{
      try {
        const id = req.params.id;
        console.log(id)
        const result = await paymentRecordModel.deletePayment(id);
        console.log(result)
        if(result.affectedRows ===0 ){
            return res.status(200).json({success: false,message : "No data found"})
        }
         res.status(200).json({success: true, data : result})

      }
      catch(error) {
          res.status(500).json({success:false, message : error.message})
      }
}
module.exports = {createPaymentDetails,updatePaymentDetails, getAllPayments, getAllUnpaidPayments,deletePayment}
const taxModel = require('../models/taxes.model');



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



module.exports = { getAllTaxRecords, createTaxRecord,updateTaxRecordById,deleteTaxRecordById }
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

module.exports = {createTenancyRecords} 
const houseModel = require('../models/house.model')

const createHouse = async (req, res)=>{

    try {
      const building_id = req.params.buildingId;
      const {house_name, electricity_meter_account_number, electricity_meter_rr_number,rent_amount  } = req.body;
      const inputData = { house_name, electricity_meter_account_number, electricity_meter_rr_number,rent_amount, building_id  } 
      const result =   await houseModel.createHouse(inputData);
      if (result === "House name already Exists"){
       return res.status(400).json({ success: false, data: result })
      }
      res.status(201).json({ success: true, data: result })
    }
      
    catch(error){
      res.status(500).json({ success: false, data: error })
    }
}

const getAllHousesByBuilding = async (req, res)=>{
      try {
           const building_id = req.params.buildingId;
           const result =  await houseModel.getAllHousesByBuilding(building_id)
           res.status(200).json({success: true, message : result})
      } catch(error){
            res.status(500).json({ success: false, data: error })   
      }
}

module.exports = {createHouse, getAllHousesByBuilding}
const houseModel = require('../models/house.model')

const createHouse = async (req, res)=>{

    try {
      const b_id = req.params.buildingId;
      const data = { ...req.body , b_id  } 
  
      const {house_name, electricity_meter_account_number, electricity_meter_rr_number,rent_amount,building_id  } = data;
        const filteredFields = Object.fromEntries(Object.entries({house_name, electricity_meter_account_number, electricity_meter_rr_number,rent_amount,building_id  }).filter(([k , v])=> v !== undefined ));

   //  const inputData = { house_name, electricity_meter_account_number, electricity_meter_rr_number,rent_amount, building_id  } 
   
      const result =   await houseModel.createHouse(filteredFields);

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
           res.status(200).json({success: true, data : result})
      } catch(error){
            res.status(500).json({ success: false, data: error })   
      }
}


const getHouseById = async (req, res)=>{
    try{
         const building_id = req.params.buildingId;
         const house_id = req.params.id;
         const result = await houseModel.getHouseById(building_id,house_id)
         if(!result){
            return res.status(404).json({success: false, message : "No such data found"})
         }
         res.status(200).json({success: true, data : result })
    }catch(error){
           res.status(500).json({success:false , message : error.message})
    }
}

const updateHouseById = async (req, res)=>{
    try {
      const id = req.params.id;
      const building_id = req.params.buildingId
      const {house_name,electricity_meter_account_number,electricity_meter_rr_number,rent_amount} = req.body;
      const allowedFields ={house_name,electricity_meter_account_number,electricity_meter_rr_number,rent_amount};
      const updatedFields = Object.fromEntries(Object.entries(allowedFields).filter(([_,value])=> value !== undefined));
        
    
      const result  = await houseModel.updateHouseById(building_id,id,updatedFields);
      if ( result === "House Name already exists"){
        return res.status(400).json({success: false, message : result})

      }
      else if(result.affectedRows===0){
           return res.status(404).json({success:false, message: "No such data found"});

     }

      res.status(200).json({success: true, data : result})
    }
    catch (error){
           res.status(500).json({success:false , message : error.message})
    }
}

const deleteHouseById = async (req, res)=>{
    try
      {
      const building_id = req.params.buildingId;
      const id = req.params.id;
      const result = await houseModel.deleteHouseById(building_id,id);
      if(result === "Invalid Data"){
        return res.status(404).json({success: false, message : result})
      }
       if(result === "Already deleted"){
        return res.status(400).json({success: false, message : result})
      }
      res.status(200).json({success: true, message: 'House archived successfully'})
      } catch(error){
         res.status(500).json({success:false , message : error.message})
      }
}

const restoreHouseById = async(req, res)=>{

     try {
        const building_id = req.params.buildingId;
        const id = req.params.id;
        
        const result =   await houseModel.restoreHouseById(building_id ,id)
        
        if(result === "Invalid Data"){
          return res.status(404).json({success:false , message: result})
        }
        if(result === "Already restored"){
          return res.status(400).json({success:false , message: result})
        }
        res.status(200).json({success:true, message : "House restored successfully"})
     }
     catch(error){
         res.status(500).json({success:false , message : error.message})
     }
}
module.exports = {createHouse, getAllHousesByBuilding, getHouseById, updateHouseById, deleteHouseById, restoreHouseById}
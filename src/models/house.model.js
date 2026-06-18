const pool = require('../config/db')
const { v4: uuidv4 } = require('uuid');



const createHouse =async (data)=>{
        const id = uuidv4();
        const {house_name, electricity_meter_account_number, electricity_meter_rr_number,rent_amount, building_id  } = data;
        const [[isExisting]] = await pool.execute(`SELECT id FROM houses WHERE house_name= ? AND building_id = ? AND is_active = 1`,[house_name,building_id])
        if(isExisting){
            return "House name already Exists"
        }
        const result =  await pool.execute(`INSERT INTO houses (id, electricity_meter_account_number, electricity_meter_rr_number, rent_amount, building_id, house_name  ) 
                          VALUES (?, ?, ?, ?, ?, ?)`,
                        [id, electricity_meter_account_number, electricity_meter_rr_number, rent_amount, building_id, house_name ]);
        return result
     
}

const getAllHousesByBuilding = async (id)=> {
       const [list]=   await pool.execute(`SELECT * FROM houses WHERE building_id = ?`,[id]);
       return list;
}

const getHouseById = async(building_id, id) =>{
          const [house] =  await pool.execute (`SELECT * FROM houses WHERE building_id= ? AND id =? AND is_active = 1`,[building_id,id]);
          return house[0]
}

const updateHouseById = async(building_id, id , updatedValues) =>{
    // check if duplicate house name is entered which is already present in the same building but allows editing the current house name.
    const updatedHouseName = updatedValues.house_name;
   
    if (updatedHouseName) {
        const [[item]] = await pool.execute(`SELECT house_name FROM houses WHERE building_id =? AND id != ? AND house_name = ? AND is_active =1`, [building_id, id, updatedHouseName])
        if (item) return "House Name already exists"
    }

    const fields = Object.keys(updatedValues)
    const values = Object.values(updatedValues)
    const setClause = fields.map(field => `${field} = ?`).join(', ')
    values.push(id, building_id) 
    
    const [result] = await pool.execute(
        `UPDATE houses SET ${setClause}, updated_at = NOW() WHERE id = ? AND building_id = ? AND is_active = 1`, values)
    return result;

}

const deleteHouseById = async(building_id , id)=>{

      const [[result]] = await pool.execute(`SELECT is_active FROM houses WHERE id = ? AND building_id = ?`, [id, building_id])
      if(!result){
         return "Invalid Data";
      }
      if(!result.is_active){
        return "Already deleted"
      }
       const [item] =    await pool.execute(`UPDATE houses SET is_active = 0, updated_at = NOW() WHERE building_id = ? AND id = ?`, [building_id,id])
         return item;
    }
const restoreHouseById = async(building_id , id)=>{

      const [[result]] = await pool.execute(`SELECT is_active FROM houses WHERE id = ? AND building_id = ?`, [id, building_id])

      if(!result){
         return "Invalid Data";
      }
      if(result.is_active){
        return "Already restored"
      }
       const [item] =    await pool.execute(`UPDATE houses SET is_active = 1, updated_at = NOW() WHERE building_id = ? AND id = ?`, [building_id,id])
         return item;
    }

module.exports = {createHouse,getAllHousesByBuilding, getHouseById, updateHouseById, deleteHouseById, restoreHouseById }
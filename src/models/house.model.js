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


module.exports = {createHouse,getAllHousesByBuilding}
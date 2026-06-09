const pool = require('../config/db')
const { v4: uuidv4 } = require('uuid')


const createBuilding = async (data) => {
  const id = uuidv4();
  const { name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image } = data
  const [result] = await pool.execute(
    `INSERT INTO buildings (id, name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image]
  )
  return result
}
const getAllBuildings = async()=>{
        const [rows]=   await pool.execute(`SELECT * FROM buildings WHERE is_active = 1`);
        return rows;
}
const getBuildingById = async(id)=>{
       const [row] = await pool.execute( `SELECT * FROM buildings WHERE id = ? AND is_active = 1`, [id]);
       return row[0];
}
module.exports = { createBuilding,getAllBuildings,getBuildingById}

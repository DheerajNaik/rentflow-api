const pool = require('../config/db')

const createBuilding = async (data) => {
  const { name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image } = data
  const [result] = await pool.execute(
    `INSERT INTO buildings (name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, address, city, yearly_tax, cauvery_water_account_number, cauvery_water_bill_image]
  )
  return result
}
const getAllBuildings = async()=>{
        const [rows]=   await pool.execute(`SELECT * FROM buildings WHERE is_active = 1`);
        return rows;
}

module.exports = { createBuilding,getAllBuildings}

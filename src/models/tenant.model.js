const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');


const createTenant = async(data)=>{
     const id = uuidv4();
     const dataWithId = {id,...data}
     const entries = Object.entries(dataWithId).filter(([_, value]) => value !== undefined);
     const columns = entries.map(([key]) => key).join(', ');
     const placeholders = entries.map(() => '?').join(', ');
     const values = entries.map(([_, value]) => value);
     const [result] = await pool.execute(`INSERT INTO tenants (${columns}) VALUES (${placeholders})`,values )
     return result;
}

const getAllTenants = async()=>{
     const [result] = await pool.execute(`SELECT * FROM tenants WHERE is_active = 1`);
     return result;
}

const getTenantById = async (id)=>{
     const [[result]] = await pool.execute (`SELECT * FROM tenants WHERE is_active = 1 AND id = ?`,[id]);
     if(!result){
        return "Invalid Request"
     }
     return result
}

const updateTenantById = async (id, updateValues)=>{
       const items = Object.keys(updateValues);
       const setClause = items.map(item=> `${item} = ?`).join(', ');
       const values = Object.values(updateValues);
       values.push(id);
       console.log(values)
       const [result] = await pool.execute(`UPDATE tenants SET ${setClause}, updated_at = NOW() WHERE is_active = 1 AND id = ?`,values)
       console.log(result)
       return result;
}
module.exports = {createTenant,getAllTenants,getTenantById,updateTenantById}
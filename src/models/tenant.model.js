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
module.exports = {createTenant,getAllTenants,getTenantById}
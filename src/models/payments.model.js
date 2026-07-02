const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createPaymentDetails = async(data)=>{
    const id = uuidv4();
    const dataWithId = {id,...data};
    const columnNames = Object.keys(dataWithId).join(", ")
    const placeholders = Object.keys(dataWithId).map(()=>`?`).join(", ")
    const values = Object.values(dataWithId)
    const [result] = await pool.execute(`INSERT INTO payments (${columnNames} ) VALUES (${placeholders})`, values);
    return result;
}

const updatePaymentDetails = async(id,data)=>{
    const columnNames = Object.keys(data).join(", ")
    const setClause = Object.keys(data).map((item)=>`${item} = ?`).join(", ")
    const values = Object.values(data)
    values.push(id);
    const [result] = await pool.execute(`UPDATE payments SET ${setClause}, updated_at = NOW() WHERE id = ?`,values) 
    return result;    
}

module.exports = {createPaymentDetails, updatePaymentDetails}
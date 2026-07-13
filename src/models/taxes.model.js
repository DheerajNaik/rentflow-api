const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createTaxRecord = async(data)=>{
     const id = uuidv4();
     const dataWithId = {id,...data}
     const entries = Object.entries(dataWithId);
     const columns = entries.map(([key]) => key).join(', ');
     const placeholders = entries.map(() => '?').join(', ');
     const values = entries.map(([_, value]) => value);
     const [result] = await pool.execute(`INSERT INTO tax (${columns}) VALUES (${placeholders})`,values )
     return result;
}

const getAllTaxRecords = async()=>{
     const [result] = await pool.execute(`SELECT t.id, b.name, t.tax_year, t.bbmp_tax_account_number, t.receipt_url,
                                    t.tax_amount_paid, t.tax_paid_date
                                    FROM tax t JOIN buildings b ON t.building_id = b.id 
                                    ORDER BY b.name ASC`);
                                    
     return result;
}

const updateTaxRecordById = async(id,updates)=>{
         const setClause = Object.keys(updates).map((item)=>`${item} = ?`).join(", ")
         const values = Object.values(updates)
         values.push(id);
         const [result] = await pool.execute(`UPDATE tax SET ${setClause}, updated_at = NOW() WHERE id = ?`,values) 
         return result; 
}

const deleteTaxRecordById = async(id)=>{
           const [item] = await pool.execute(`SELECT id from tax  WHERE id = ?`, [id]);
         
          if (item.length ===0) {
            return null
          } 
           else {
           const [item] = await pool.execute(`DELETE FROM tax where id =?`, [id]);
            return item;
          }
}



module.exports = {createTaxRecord,getAllTaxRecords,updateTaxRecordById, deleteTaxRecordById}
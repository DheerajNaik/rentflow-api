const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const createExpense = async(data)=>{
     const id = uuidv4();
     const dataWithId = {id,...data}
     const entries = Object.entries(dataWithId);
     const columns = entries.map(([key]) => key).join(', ');
     const placeholders = entries.map(() => '?').join(', ');
     const values = entries.map(([_, value]) => value);
     const [result] = await pool.execute(`INSERT INTO expenses (${columns}) VALUES (${placeholders})`,values )
     return result;
}

const getAllExpenses = async()=>{
     const [result] = await pool.execute(`SELECT expenses.*, buildings.name as building_name, houses.house_name
                                            FROM expenses
                                            LEFT JOIN buildings ON expenses.building_id = buildings.id
                                            LEFT JOIN houses ON expenses.house_id = houses.id
                                            WHERE expenses.is_active = 1
                                            ORDER BY buildings.name`);
     return result;
}

const editExpenseById = async(id,updates)=>{
         const setClause = Object.keys(updates).map((item)=>`${item} = ?`).join(", ")
         const values = Object.values(updates)
         values.push(id);
         const [result] = await pool.execute(`UPDATE expenses SET ${setClause}, updated_at = NOW() WHERE id = ?`,values) 
         return result; 
}

const deleteExpenseById = async(id)=>{
           const [[item]] = await pool.execute(`SELECT is_active FROM expenses WHERE id = ?`, [id]);
          if (!item) {
            return null
          } 
           if (item.is_active) {
            const [row] = await pool.execute(`UPDATE expenses SET is_active = 0, updated_at = NOW() WHERE id = ?`, [id]);
            return row
          } else {
            return "Already deleted"
          }
}



module.exports = {createExpense,getAllExpenses,editExpenseById, deleteExpenseById}
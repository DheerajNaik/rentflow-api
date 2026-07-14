const pool = require('../config/db')
const { v4: uuidv4 } = require('uuid');



const createBuilding = async (data) => {
  const id = uuidv4();
     const dataWithId = {id,...data}
     const entries = Object.entries(dataWithId);
     const columns = entries.map(([key]) => key).join(', ');
     const placeholders = entries.map(() => '?').join(', ');
     const values = entries.map(([_, value]) => value);
     const [result] = await pool.execute(`INSERT INTO buildings (${columns}) VALUES (${placeholders})`,values )
     return result;
}
const getAllBuildings = async()=>{
        const [rows]=   await pool.execute(`SELECT * FROM buildings WHERE is_active = 1`);
        return rows;
}
const getBuildingById = async(id)=>{
       const [row] = await pool.execute( `SELECT * FROM buildings WHERE id = ? AND is_active = 1`, [id]);
       return row[0];
}
const updateBuildingById = async(id,updates)=>{
       const fields = Object.keys(updates)
       const values = Object.values(updates)
       const setClause = fields.map(field => `${field} = ?`).join(', ')
       values.push(id) // add id at the end for WHERE clause

       const [result] = await pool.execute(
        `UPDATE buildings SET ${setClause}, updated_at = NOW() WHERE id = ? AND is_active = 1`,
        values
        )

  return result
}

const deleteBuildingById = async (id) => {
          const [[item]] = await pool.execute(`SELECT is_active FROM buildings WHERE id = ?`, [id]);
          if (!item) {
            return null
          } else if (item.is_active) {
            const [row] = await pool.execute(`UPDATE buildings SET is_active = 0, updated_at = NOW() WHERE id = ?`, [id]);
            return [row]
          } else {
            return "Already deleted"
          }

}

const restoreBuildingById = async (id) => {
          const [[item]] = await pool.execute(`SELECT is_active FROM buildings WHERE id = ?`, [id]);
          if (!item) {
            return null
          } else if (item.is_active) {
            return "Already restored"
          } else {
            const [row] = await pool.execute(`UPDATE buildings SET is_active = 1, updated_at = NOW() WHERE id = ?`, [id]);
            return [row]

          }
}
module.exports = { createBuilding,getAllBuildings,getBuildingById, updateBuildingById, deleteBuildingById, restoreBuildingById}

const pool = require('../config/db');



const loginUser = async(username,password)=>{
      const [result] = await pool.execute(`SELECT id, username,password FROM admin WHERE username = ?`,[username]);
      return result;
}

module.exports = {loginUser}
const jwt = require('jsonwebtoken');
const authModel = require('../models/auth.model');
const bcrypt = require('bcryptjs')


const loginUser = async (req, res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        const result = await authModel.loginUser(username,password);

        if (result.length === 0) {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        if (result[0].username) {
           // const password = result[0].password;
            
            const id = result[0].id;
            const isPasswordValid = await bcrypt.compare(password, result[0].password);
            
            if(!isPasswordValid){
             return res.status(401).json({ success: false, result: "Unauthorized" });
            }
            else{
            const accessToken = jwt.sign({ id },process.env.TOKEN_SECRET,{ expiresIn: '2m' });
            res.status(200).json({ success: true, data: {token : accessToken} , message : "User Logged-In"});
            }
        }
        else{
            res.status(401).json({ success: false, result: "Unauthorized" });
        }

   
    }
    catch(error){
          res.status(500).json({ success: false, message: error.message })
    }
}

const logoutUser = async (req, res)=>{
      res.status(200).json({success: true, message : "Logged-Out"})
}
module.exports = {loginUser, logoutUser}
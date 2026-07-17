const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {validateLogin} = require('../middleware/authValidator')



router.post('/login',validateLogin,authController.loginUser);
router.post('/logout',authController.logoutUser)


module.exports=router
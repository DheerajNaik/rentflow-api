const Joi = require('joi')
const jwt = require('jsonwebtoken');


const authSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

const validateLogin = (req, res, next) => {
    const { error } = authSchema.validate(req.body, { abortEarly: false })
    if (error) {
        const messages = error.details.map(detail => detail.message);
        return res.status(400).json({ success: false, messages })
    }
    next()
}

const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ success: false, message: "no token provided" })
            

        const tokenArray = token.split(' ');

        const verifyToken = jwt.verify(tokenArray[1], process.env.TOKEN_SECRET);
        const expiryTime = verifyToken.exp;
        const bufferTimeInSeconds = 60;
        const currentTimeInSeconds = Math.floor(Date.now()/1000);
        const warnToLoginAgain = currentTimeInSeconds>= expiryTime-bufferTimeInSeconds;
        if(warnToLoginAgain){
            console.log("You will be logged out in a minute, relogin again after that")
        }
        req.admin = verifyToken;
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ success: false, message: error.message })
        } else if (error.name === "TokenExpiredError") {
            res.status(401).json({ success: false, message: error.message })
        }
    }

}

module.exports = { validateLogin, validateToken }
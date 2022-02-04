require('dotenv').config()
const jwt = require('jsonwebtoken')
const verifyToken = async (req,res,next) => {
    try {
        const bearerToken = req.headers['authorization']    
        if(bearerToken != ''){                                                
            const decoded = jwt.verify(bearerToken,process.env.SECRET)
            if(decoded) next()            
        }else{
            res.status(403).json({error_message:'No token provided'})
        }    
    } catch (error) {
        res.send({error:error.message})
    }    
}
module.exports = {
    verifyToken
}
const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    try{
        const token  =  req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)

        req.user =  decode

        next()
    }
    catch(error){
        if(error.name  === "TokenExpiredError"){
            res.status(401).json({
                message:"Token Expired"
            })
        }
        res.json({
            message:"Authentaction Failed!"
        })
    }
}

module.exports = authenticate
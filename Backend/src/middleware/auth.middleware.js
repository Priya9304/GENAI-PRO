const jwt = require("jsonwebtoken");//for verifying the token
const tokenBlacklistModel = require("../models/Blacklist.model");

async function authUser(req,res,next){
    const token = req.cookies.token //reading the token from cookies
    
    //if token not found we are unable to authenticate,which user is requestig
    if(!token){
        return res.status(401).json({
        message:"Token not Provided"
        })
    }
    //Check whether the token is blacklisted or not
     const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })
    
    if(isTokenBlacklisted){
        return res.status(401).json({
        message:"Token is Blacklisted"
        })
    }
    //if token is wrong or expired then jwt.verify throw an error,for handling it we use try and catch
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
        message:"Invalid Token"
        })
    }
}

module.exports = {authUser}
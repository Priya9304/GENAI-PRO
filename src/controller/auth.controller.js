const userModel = require("../models/user.model")


  /**
 * @name registerUserController
 * @description Register a new user,expects username,email and paasword in request body
 * @access public
 */
async function registerUserController(req, res){
  const {username,email,password} = req.body;
  if(!username || !email || !password){
    return res.status(400).json({
        message:"Please provide username,email and password"
    })
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{userName},{email}]
  })
  if(isUserAlreadyExists){
    return res.status(400).json({
        message:"User Already exists with this username or email id"
    })
  }
}

module.exports={
    registerUserController
}
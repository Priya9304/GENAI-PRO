const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');


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
  

  //bcryptjs is used for hashing of password
  //jsonwebtoken is used to create jwt webtoken
  //cookie-parser is used to set the token to cookie and read the token form cookie

  const hash = await bcrypt.hash(password,10);

  const user = await userModel.create({
    username,
    email,
    password:hash
  })
}

module.exports={
    registerUserController
}
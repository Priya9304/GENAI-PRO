const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/Blacklist.model");

/**
* @name registerUserController
* @description Register a new user,expects username,email and paasword in request body
* @access public
*/
async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email and password"
    })
  }
  //This is written here to check whether a user with the provide username or email is exists or not
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }]
  })
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User Already exists with this username or email id"
    })
  }
  //bcryptjs is used for hashing of password
  //jsonwebtoken is used to create jwt webtoken
  //cookie-parser is used to set the token to cookie and read the token form cookie

  const hash = await bcrypt.hash(password, 10);//hash the password

  //created a user with hash password
  const user = await userModel.create({
    username,
    email,
    password: hash
  });
  //Token created for the data user_id and username which expires in 1 day
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  //setting token to the cookie
  res.cookie("token", token)

  //sending 201 status code cause we are creating a resource(in backend creating a user is also called resourse)
  res.status(201).json({
    message: "user registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}
/**
* @name LoginUserController
* @description login a user,expects email and password in the request body
* @access public
*/
async function LoginUserController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email })//checking if user is present or not

  //if user not found they have to first register and then login
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }
  //checking the password
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password"
    })
  }

  //creating a token
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )
  //setting token into cookie

  res.cookie("token", token)
  res.status(200).json({
    message: "User LoggedIn successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email

    }
  })
}
//Token Blacklisting:-Token blacklisting is a security mechanism in authentication systems 
// where a token (such as a JWT) is marked as invalid and stored in a blacklist after logout 
// or revocation, and every incoming request is checked against this list to deny access if 
// the token is found, or allow access if it is not.
/**
* @name logoutUserController
* @description clear token from user cookie and add the token in blacklist
* @access public
*/
async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token })
  }

  res.clearCookie('token')

  res.status(200).json({
    message: "User Logout successfully!!!"
  })
}

/**
 * @name getMeUserController
 * @description get the current logged in user details
 * @access public
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id)
  res.status(200).json({
    message: "User deatils fetch successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email

    }
  })
}

module.exports = {
  registerUserController,
  LoginUserController,
  logoutUserController,
  getMeController
}
const express = require('express');
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = express.Router();
/**
 * @route "./api/auth/register"
 * @description Register a new user
 * @access public
 */
authRouter.get("/register",authController.registerUserController);

/**
 * @route "./api/auth/login"
 * @description Login user with email amd password
 * @access public
 */
authRouter.post("/login",authController.LoginUserController);

/**
 * @route "./api/auth/logoutr"
 * @description clear token from cookie
 * @access public
 */

authRouter.get("/logout",authController.logoutUserController);

/**
 * @route "./api/auth/get-me"
 * @description get the current logged in user details
 * @access public
 */
//If any user is requestion to this api,the details of that user is sended as a response from the database
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);

module.exports = authRouter;
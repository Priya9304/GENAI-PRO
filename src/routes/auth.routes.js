const express = require('express');
const authController = require("../controller/auth.controller")

const authRouter = express.Router();
/**
 * @route "./api/auth/register"
 * @description Register a new user
 * @access public
 */

authRouter.post("/register",authController.registerUserController);





module.exports = authRouter;
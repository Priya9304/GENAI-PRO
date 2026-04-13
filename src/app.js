//This app.js file have mainly two main work
//1.Initiate the server means to create a instance of a serve.
//2.To use middleware and routes(the api we create).
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.routes");

//api/auth is prefix we need to use before using the authRoutes
app.use("/api/auth",authRouter);
module.exports = app;

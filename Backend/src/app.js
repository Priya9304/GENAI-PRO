//This app.js file have mainly two main work
//1.Initiate the server means to create a instance of a serve.
//2.To use middleware and routes(the api we create).
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true
})) // It controls who is allowed to access your backend API from a browser.

const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes")

//api/auth is prefix we need to use before using the authRoutes
app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);
module.exports = app;

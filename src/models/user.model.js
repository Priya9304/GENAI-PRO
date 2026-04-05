const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true,"Name already exists"],
        required:true,
    },
    email: {
        type: String,
        unique: [true,["Account already exists with the same email id"]],
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
    //model will define the userSchema will store in which collection
})
    const userModel = mongoose.model("users",userSchema)
    module.exports = userModel
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
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
    //model will define the userSchema and it will store in which collection
})
    const userModel = mongoose.model("users",UserSchema)
    module.exports = userModel
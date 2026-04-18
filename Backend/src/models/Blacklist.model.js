const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type:String,
        required:[true,"Token is required to be added in Blacklist"]
    }
},{
    timestamps: true
});
const tokenBlacklistModel = mongoose.model("BlacklistToken",blacklistTokenSchema);

module.exports = tokenBlacklistModel;
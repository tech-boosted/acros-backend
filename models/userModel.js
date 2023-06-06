const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    id:String,
    password:String
});

userSchema.methods.getJWTToken = function () { // here we are making the methods
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { // here we are making the token using the id as payload
        expiresIn: process.env.JWT_EXPIRE,
    })
}


module.exports = mongoose.model("UserModel",userSchema);
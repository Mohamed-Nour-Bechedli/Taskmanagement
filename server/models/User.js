const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName: { type : String, required : true },
    lastName: { type : String, required : true },
    email: { type : String, required : true, unique: true },
    password: { type : String, required : true }
});

userSchema.methods.generateAuthToken = function() {
    const token = jsonwebtoken.sign({
        _id : this._id,
        email : this.email,
        firstName : this.firstName
    }, process.env.JWT_SECRET, { expiresIn : '1h'});
    return token;
};

const User = mongoose.model('User', userSchema);


module.exports = { User };
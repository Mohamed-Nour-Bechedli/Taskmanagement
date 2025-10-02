const { User } = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const loggIn = async (req, res) => {
    try {
       
        const user = await User.findOne( { email : req.body.email });
        if(!user) {
            return res.status(400).json({ message : 'Email or Password is wrong' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(400).json({ message : 'Email or Password is wrong' });
        }
        const token = user.generateAuthToken();
        res.status(200).json({ data : token, message : 'logged in successfully!'})
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error' });
    }
};

const validater = (data) => {
    if (!validator.isEmail(data.email)) {
        return { error: { details: [{ message: "Invalid email" }] } };
    }
    if (!validator.isStrongPassword(data.password)) {
        return { error: { details: [{ message: "Weak password" }] } };
    }
    return { };
};

module.exports = { loggIn };
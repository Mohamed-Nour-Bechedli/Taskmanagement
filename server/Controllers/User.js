const { User } = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).send({ message: 'User with given email already exists!' });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const hashPassword = await bcrypt.hash(password, salt);
        await new User({ firstName, lastName, email, password: hashPassword }).save();
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
};


// Get profile
const getProfile = async (req, res) => {
    try {
        const userId= req.user._id;
        const profile = await User.findById(userId).select('-password');
        if(!profile) {
            return res.status(404).json({ message : "User not found" });
        }
        res.status(200).json(profile); 
    } catch (error) {
        res.status(500).json({ message : "Internal Server Error"});
    }
}

// Update profile
const updateProfile = async (req, res) => {
    try {

        const userId = req.user._id;
        const { firstName, lastName, email, password } = req.body;
        const updateData = {};

        if(firstName) updateData.firstName = firstName;
        if(lastName) updateData.lastName = lastName;
        if(email) {
            const existingEmail = await User.findOne({ email, _id : {$ne : userId} });
            if(existingEmail) {
                return res.status(409).json({ message : "Email already in use" });
            }
            updateData.email = email;
        }

        if(password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const hashPassword = await bcrypt.hash(password, salt);
            updateData.password = hashPassword;
        }
        
        const update = await User.findByIdAndUpdate(userId, {$set : updateData}, { new : true, runValidators : true }).select('-password');

        res.status(200).json(update);

    } catch (error) {
        res.status(500).json({ message : "Internal Server Error" });
    }
}


module.exports = { register, getProfile, updateProfile };
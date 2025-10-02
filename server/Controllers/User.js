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

module.exports = { register };
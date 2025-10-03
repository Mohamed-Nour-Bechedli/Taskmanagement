const { User } = require('../models/User');
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
        res.status(200).json({ token, message : 'logged in successfully!'})
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error' });
    }
};


module.exports = { loggIn };
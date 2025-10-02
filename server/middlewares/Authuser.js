const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Access Denied, No token provided' });
        }

        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
}


module.exports = authUser;
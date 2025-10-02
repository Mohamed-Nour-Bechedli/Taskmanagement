const router = require('express').Router();
const { register } = require('../Controllers/User');
const {registerValidation, validate} = require('../Controllers/UserValidater');

// Register Router
router.post('/register', registerValidation, validate, register);

module.exports = router;
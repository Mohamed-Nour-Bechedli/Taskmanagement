const { check, validationResult } = require('express-validator');

// Registration validation rules
const registerValidation = [
    check('firstName')
        .isAlpha().withMessage('First name must contain only letters')
        .isLength({ min: 2, max: 30 }).withMessage('First name must be between 2 and 30 characters'),
    check('lastName')
        .isAlpha().withMessage('Last name must contain only letters')
        .isLength({ min: 2, max: 30 }).withMessage('Last name must be between 2 and 30 characters'),
    check('email')
        .isEmail().withMessage('Invalid email address'),
    check('password')
        .isStrongPassword().withMessage(
            'Password must be at least 8 chars long, include 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
        )
];

// Middleware to check results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { registerValidation, validate };

const { check, validationResult } = require('express-validator');

const updateValidater = [
    check('firstName')
        .optional()
        .isAlpha().withMessage('First name must contain only letters')
        .isLength({ min: 2, max: 30 }).withMessage('First name must be between 2 and 30 characters'),

    check('lastName')
        .optional()
        .isAlpha().withMessage('Last name must contain only letters')
        .isLength({ min: 2, max: 30 }).withMessage('Last name must be between 2 and 30 characters'),

    check('email')
        .optional()
        .isEmail().withMessage('Invalid email address'),

    check('password')
        .optional()
        .isStrongPassword().withMessage(
            'Password must be at least 8 chars, include 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
        )
];

const validater = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { updateValidater, validater };
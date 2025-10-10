const router = require('express').Router();
const { register,getProfile,updateProfile, verifyEmail, resendVerification } = require('../Controllers/User');
const {registerValidation, validate} = require('../Controllers/UserValidater');
const authUser = require('../middlewares/Authuser');
const {updateValidater, validater} = require('../Controllers/UpdateValidater');

// Register Router
router.post('/register', registerValidation, validate, register);
router.get('/verify/:token', verifyEmail);

// Resend verification email
router.post('/resend-verification', resendVerification);

// Profile routes
router.get('/profile', authUser, getProfile);
router.put('/profile', authUser, updateValidater, validater, updateProfile);

module.exports = router;
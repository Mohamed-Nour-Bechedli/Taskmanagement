const { User } = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Nodemailer transpoter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})


// User registration
const register = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).send({ message: 'User with given email already exists!' });
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const hashPassword = await bcrypt.hash(password, salt);

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        await new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            verified: false,
            verificationToken
        }).save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        console.log("Verification URL:", verifyUrl);

        await transporter.sendMail({
            from: `"No Reply" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your email",
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Welcome, ${firstName}!</h2>
                    <p>Thank you for signing up. Please verify your email by clicking the button below:</p>
                    <a href="${verifyUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Verify Email
                    </a>
                    <p>This link will expire in 24 hours.</p>
                </div>`
        })

        res.status(201).send({ message: 'User registered successfully! Please check your email to verify your account.' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

// Verify email
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by email only
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        // Mark as verified
        user.verified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Verification link expired" });
        }
        res.status(400).json({ message: "Invalid verification token" });
    }
};



// Get profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const profile = await User.findById(userId).select('-password');
        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update profile
const updateProfile = async (req, res) => {
    try {

        const userId = req.user._id;
        const { firstName, lastName, email, password } = req.body;
        const updateData = {};

        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (email) {
            const existingEmail = await User.findOne({ email, _id: { $ne: userId } });
            if (existingEmail) {
                return res.status(409).json({ message: "Email already in use" });
            }
            updateData.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
            const hashPassword = await bcrypt.hash(password, salt);
            updateData.password = hashPassword;
        }

        const update = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true, runValidators: true }).select('-password');

        res.status(200).json(update);

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Resend verification email
const resendVerification = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Email is already verified" });
        }

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        user.verificationToken = verificationToken;
        await user.save();

        const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

        await transporter.sendMail({
            from: `"No Reply" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your email - Resend",
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2>Hello, ${user.firstName}!</h2>
                    <p>You requested a new verification email. Click the link below to verify your account:</p>
                    <a href="${verifyUrl}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        Verify Email
                    </a>
                    <p>This link will expire in 24 hours.</p>
                </div>`
        });

        res.status(200).json({ message: "Verification email resent! Please check your inbox." });
    } catch (error) {
        console.error("Resend Verification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



module.exports = { register, getProfile, updateProfile, verifyEmail, resendVerification };
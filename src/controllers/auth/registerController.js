const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const userModel = require('../../models/User');

exports.registerUser = async (req, res) => {

    const {firstName, lastName, email, password, role = 'customer'} = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User already exists with this email.'});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        // Respond with success (could also generate and return a JWT token here)
        res.status(201).json({
            message: 'User registered successfully.',
            user_id: newUser._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error registering user', error: error.message});
    }
};

exports.updateUserProfile = async (req, res) => {

}
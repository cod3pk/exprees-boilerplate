const bcrypt = require('bcrypt');
const userModel = require('../../models/User');

// Register User
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

// Update User profile
exports.updateUserProfile = async (req, res) => {
    const userID = req.params.userId
    const {phone, cnic, dob, address, profileImage} = req.body;

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userID,
            {phone, cnic, dob, address, profileImage},
            {new: true, runValidators: true}
        )

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User Not found'
            });
        }

        res.status(200).json({
            message: 'Profile has been updated successfully',
            data: updatedUser
        });

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error updating the profile', error: err.message
        })
    }

}
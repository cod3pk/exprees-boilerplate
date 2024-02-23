const bcrypt = require('bcrypt');
const userModel = require('../../models/User');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {

  const {firstName, lastName, email, password, role = 'customer'} = req.body;

  try {
    const existingUser = await userModel.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exists with this email.'});
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const accessToken = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET,
      {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_REFRESH_SECRET,
      {expiresIn: '7d'}
    );

    res.status(201).json({
      message: 'User registered successfully.',
      token: accessToken,
      refreshToken: refreshToken,
      user_id: newUser._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Error registering user', error: error.message});
  }
};

// Update User profile
const updateUserProfile = async (req, res) => {
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

    const {password: _, __v: __, ...userFilteredData} = updatedUser.toObject();

    res.status(200).json({
      message: 'Profile has been updated successfully',
      data: userFilteredData
    });

  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Error updating the profile', error: err.message
    })
  }

}

module.exports = {registerUser, updateUserProfile};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../../models/User');

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

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

    user.refreshToken.push(refreshToken);
    await user.save();

    res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      data: {userId: user._id, email: user.email}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Unable to login', error: err.message});
  }
};

module.exports = { login }
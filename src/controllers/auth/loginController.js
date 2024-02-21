const bcrypt = require('bcrypt');
const userModel = require('../../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
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

    const token = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_SECRET, {
        expiresIn: '24h'
      }
    );

    const {password: _, __v: __, ...filteredUserData} = user.toObject();

    res.status(200).json({
      message: 'Login successful',
      token: token,
      data: filteredUserData
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Unable to login at the moment',
      error: err.message
    });
  }
};

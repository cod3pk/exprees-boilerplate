const userModel = require('../../models/User');
const jwt = require('jsonwebtoken');

const logout = async (req, res) => {
  const {refreshToken} = req.body;

  if (!refreshToken) {
    return res.status(400).json({message: 'Refresh Token is required'});
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await userModel.findById(payload.userId).populate('refreshToken');

    if (!user || !user.refreshTokens) {
      return res.status(404).json({message: 'User not found or refreshTokens not populated'});
    }

    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await user.save();

    res.status(200).json({message: 'Logged out successfully'});
  } catch (error) {
    res.status(500).json({message: 'Error logging out', error: error.toString()});
  }
};

module.exports = {logout};

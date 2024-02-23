const userModel = require("../../models/User");
const jwt = require("jsonwebtoken");

refreshTokenGen = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(401).json({
      message: "Refresh Token is required."
    })
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await userModel.findById(payload.userId);

    if (!user || !user.refreshToken.includes(refreshToken)) {
      return res.status(403).json({message: 'Refresh Token is invalid'});
    }

    const newAccessToken = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );

    res.status(200).json({
      message: 'Access Token refreshed successfully',
      token: newAccessToken
    });

  } catch (err) {
    res.status(403).json({message: 'Invalid Refresh Token'});
  }

}

module.exports = { refreshTokenGen };
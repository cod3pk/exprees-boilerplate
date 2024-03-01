const userModel = require("../../models/User");
const jwt = require("jsonwebtoken");

const logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh Token is required" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await userModel
      .findById(payload.userId)
      .populate("refreshTokens");

    if (!user || !user.refreshTokens) {
      return res
        .status(404)
        .json({ message: "User not found or refresh Tokens not populated" });
    }

    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken
    );
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.toString() });
  }
};

module.exports = { logout };

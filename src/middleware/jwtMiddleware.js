require('dotenv').config();
const jwt = require("jsonwebtoken");

exports.authenticationToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({message: 'Authorization header is missing.'});
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Token is missing in the Authorization header.'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const message = getErrorMessage(err);
      return res.status(403).json({message});
    }

    req.user = user;
    next();
  });
};

function getErrorMessage(err) {
  if (err instanceof jwt.TokenExpiredError) {
    return 'Your token has expired. Please log in again.';
  } else if (err instanceof jwt.JsonWebTokenError) {
    s
    return 'Failed to authenticate token. Make sure your token is correct.';
  } else if (err instanceof jwt.NotBeforeError) {
    return 'Token not active yet. Check the "nbf" claim.';
  } else {
    return 'Error in token authentication.';
  }
}

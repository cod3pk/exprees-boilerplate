const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const refreshTokenController = require('../controllers/auth/refreshTokenController');
const logoutController = require("../controllers/auth/logoutController");
const {validate, registerRules} = require("../middleware/auth/registerMiddleware");
const {loginRules} = require('../middleware/auth/loginMiddleware');
const {updateProfileRules} = require("../middleware/auth/updateProfileMiddleware");
const {authenticationToken} = require("../middleware/jwtMiddleware");

router.post('/register', registerRules(), validate, registerController.registerUser);
router.patch('/profile/:userId', authenticationToken, updateProfileRules(), validate, registerController.updateUserProfile);
router.post('/login', loginRules(), validate, loginController.login)
router.post('/refreshToken', refreshTokenController.refreshTokenGen)
router.post('/logout', logoutController.logout);

module.exports = router;

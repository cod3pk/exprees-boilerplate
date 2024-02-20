const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const {validate, registerRules} = require("../middleware/auth/register/registerMiddleware");
const {loginRules} = require('../middleware/auth/login/loginMiddleware');
const {updateProfileRules} = require("../middleware/auth/register/updateProfileMiddleware");

router.post('/register', registerRules(), validate, registerController.registerUser);
router.patch('/profile/:userId', updateProfileRules(), validate, registerController.updateUserProfile);
router.post('/login', loginRules(), validate, loginController.login)

module.exports = router;

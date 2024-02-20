const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/registerController');
const {validate, registerRules, protect, authorize} = require("../middleware/authMiddleware");
const {updateProfileRules} = require("../middleware/register/updateProfileMiddleware");

router.post('/register', registerRules(), validate, registerController.registerUser);
router.patch('/profile/:userId', updateProfileRules(), validate, registerController.updateUserProfile);

module.exports = router;

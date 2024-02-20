const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/registerController');
const {validate, registerRules} = require("../middleware/authMiddleware");

router.post('/register', registerRules(), validate, registerController.registerUser);

module.exports = router;

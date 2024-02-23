const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/media');
const {authenticationToken} = require("../middleware/jwtMiddleware");

router.post('/upload/:userId', authenticationToken, mediaController.uploadFile);

module.exports = router;
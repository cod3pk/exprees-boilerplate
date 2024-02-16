const express = require('express');
const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to The United Insurance of Pakistan. Access is restricted to authenticated users only'});
});

module.exports = indexRouter;
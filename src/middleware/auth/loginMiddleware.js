const {body, validationResult} = require('express-validator');

const loginRules = () => [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long.'),
];

module.exports = {
    loginRules
};

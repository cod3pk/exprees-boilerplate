const {body, validationResult} = require('express-validator');

const registerRules = () => [
    body('firstName').trim().escape().notEmpty().withMessage('First name is required.'),
    body('lastName').trim().escape().notEmpty().withMessage('Last name is required.'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address.'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long.'),
    body('role').optional().trim().escape().isIn(['admin', 'portalAdmin', 'customer', 'agent']).withMessage('Invalid role specified.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({errors: errors.array()});
};

module.exports = {
    registerRules,
    validate,
};

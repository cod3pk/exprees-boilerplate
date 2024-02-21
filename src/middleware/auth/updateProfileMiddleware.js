const {body, validationResult} = require('express-validator');
const dateFormatter = require('../../utils/dateFormatter');

const updateProfileRules = () => [
    body('phone').optional().trim().isMobilePhone(),
    body('cnic').optional().trim().isLength({min: 13, max: 15}),
    body('dob').optional().custom((value, { req }) => {
        if (value) {
            const date = Date.parse(value);
            if (!isNaN(date)) {
                req.body.dob = dateFormatter(date);
            } else {
                throw new Error('Invalid date format');
            }
        }
        return true;
    }),
    body('address').optional().trim(),
    body('profileImage').optional().trim(),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({errors: errors.array()});
};

module.exports = {
    updateProfileRules,
    validate,
};

const limiter = require('express-rate-limit')

const rateLimit = limiter({
    windowMs: 15 * 60 * 1000,
    max: 100, // Limiting each IP to 100 requests per 15 minutes
})

module.exports = rateLimit;
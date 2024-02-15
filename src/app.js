require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/policies', require('./routes/policyRoutes'));
// Add other routes...

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));

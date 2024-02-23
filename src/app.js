require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
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
app.use(fileUpload());

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/media', require('./routes/fileUploader'));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'There is technical problem in the API',
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

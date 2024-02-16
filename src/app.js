require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const connectDB = require("./config/db");
const limiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/", require("./routes/indexRoute"));

// Global error handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

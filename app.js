const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(helmet()); // Security middleware
app.use(express.json()); // Body parsing middleware

// Apply CORS middleware
app.use(cors({
  origin: '*', // Replace '*' with specific allowed origins in production for security reasons
  methods: ['GET', 'POST', 'PUT', 'patch', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// routes middleware
app.use(routes);

// Wildcard route handler for non-existing routes (404)
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// ErrorHandler middleware
app.use(errorHandler);

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught exception occurred:\n', err);
});

// Database connection
const {
  PORT, DB_USERNAME, DB_PASSWORD, CLUSTER_URL, DB_NAME,
} = process.env;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}`;
mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

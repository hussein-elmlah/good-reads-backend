require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

const uploadFolder = 'uploads/';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: '*', // Origin '*' should be changed for production.
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  credentials: true,
}));

app.use(routes);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use(errorHandler);

process.on('uncaughtException', (exception) => {
  console.log('Uncaught exception occurred:\n', exception);
  // here use process.exit(1); and use process manager to restart at any stop in deployment phase.
});
process.on('unhandledRejection', (exception) => {
  console.log('unhandled Rejection occurred:\n', exception);
  // here use process.exit(1); and use process manager to restart at any stop in deployment phase.
});

const {
  PORT, DB_USERNAME, DB_PASSWORD, CLUSTER_URL, DB_NAME,
} = process.env;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}`;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port   http://localhost:${PORT}/`);
    });

    const gracefulShutdown = () => {
      console.log('Starting graceful shutdown...');
      
      server.close(() => {
        console.log('Express server closed.');
        
        mongoose.disconnect();
      });

      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
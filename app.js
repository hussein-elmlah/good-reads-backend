const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'patch', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(routes);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception occurred:\n', err);
});

const {
  PORT, DB_USERNAME, DB_PASSWORD, CLUSTER_URL, DB_NAME,
} = process.env;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}`;

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server is running on port   http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

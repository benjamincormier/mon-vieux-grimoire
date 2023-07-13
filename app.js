const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const app = express();

// mongodb+srv://benjamincormier:sGmNbYG4FMbNJ8f2@cluster0.8rceppu.mongodb.net/

// MIDDLEWARE

// parsing json in req
app.use(express.json());

// CORS handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

// ROUTES
app.use('/api/auth', userRouter);

module.exports = app;

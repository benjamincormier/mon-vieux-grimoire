const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const booksRouter = require('./routes/booksRoutes');
const app = express();

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

// Test middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  console.log(req.url);
  console.log(req.headers);
  next();
});

// ROUTES
app.use('/api/auth', userRouter);
app.use('/api/books', booksRouter);

module.exports = app;

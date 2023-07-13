const express = require('express');
const userRouter = require('./routes/userRoutes');
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

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

// TEMP middleware to end req/res cycle
app.use((req, res, next) => {
  console.log(`This is a request on ${req.path}`);
  console.log(`req.body = ${req.body}`);
  console.log('Réponse envoyée avec succès !');
  // res.status(201);
  // res.json({ message: "Votre requête a bien été reçue !" });
  next();
});

// ROUTES
app.use('/api/auth', userRouter);

module.exports = app;

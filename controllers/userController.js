const bcrypt = require('bcrypt');
const user = require('../models/userModel');

// Sign Up
exports.createUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'User created!' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Log In
exports.getUser = (req, res) => {
  console.log('getUser called');
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

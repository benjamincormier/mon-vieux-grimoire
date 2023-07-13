const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Routes
router.route('/signup').post(userController.createUser);
router.route('/login').post(userController.getUser);

module.exports = router;

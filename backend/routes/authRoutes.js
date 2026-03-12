const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Signup route
// POST http://localhost:5000/api/auth/signup
router.post('/signup', signup);

// Login route
// POST http://localhost:5000/api/auth/login
router.post('/login', login);

module.exports = router;
// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, protectedRoute, logout } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Registro de usuario
router.post('/register', register);

// Login
router.post('/login', login);

// Ruta protegida (ejemplo)
router.get('/protected', authMiddleware, protectedRoute);

// Logout
router.post('/logout', logout);

module.exports = router;
// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  protectedRoute,
  logout,
  checkEmail
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

// Registro de usuario
router.post('/register', register);

// Login
router.post('/login', login);

// Validación asíncrona: verificar si un correo ya existe
router.post('/check-email', checkEmail);

// Ruta protegida (requiere token válido)
router.get('/protected', authMiddleware, protectedRoute);

// Logout (solo borra token en frontend)
router.post('/logout', logout);

module.exports = router;

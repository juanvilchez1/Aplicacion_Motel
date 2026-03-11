// backend/src/controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro
exports.register = async (req, res) => {
  console.log("Datos recibidos en registro:", req.body);
  const { nombre, correo, contraseña, rol_id } = req.body;
  try {
    if (!rol_id) {
      return res.status(400).json({ error: "El rol_id es obligatorio" });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    await pool.query(
  'INSERT INTO usuarios (nombre, correo, contraseña, rol_id) VALUES (?, ?, ?, ?)',
  [nombre, correo, hashedPassword, rol_id]
);

    res.json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Login
exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: usuario.id,
      rol_id: usuario.rol_id,
      nombre: usuario.nombre,
      correo: usuario.correo
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'clave_secreta',
      { expiresIn: '1h' }
    );

    // Generar refreshToken si lo vas a usar
    // const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh_secreta', { expiresIn: '7d' });
    res.json({
      mensaje: 'Login exitoso',
      usuario: { id: usuario.id, nombre: usuario.nombre, rol_id: usuario.rol_id },
      token: accessToken
      // refreshToken
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Ruta protegida
exports.protectedRoute = (req, res) => {
  res.json({ mensaje: 'Accediste a una ruta protegida', usuario: req.user });
};

// Logout (opcional, en frontend se borra el token)
exports.logout = (req, res) => {
  res.json({ mensaje: 'Sesión cerrada. Borra el token en el frontend.' });
};

// Validación asíncrona: verificar si un correo ya existe
exports.checkEmail = async (req, res) => {
  const { correo } = req.body;
  try {
    const [rows] = await pool.query('SELECT id FROM usuarios WHERE correo = ?', [correo]);
    res.json({ exists: rows.length > 0 });
  } catch (error) {
    console.error("Error verificando correo:", error);
    res.status(500).json({ error: "Error verificando correo" });
  }
};
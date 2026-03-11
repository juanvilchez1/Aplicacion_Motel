// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db'); // conexión a MySQL

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

// Ruta de prueba para verificar conexión a la BD
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    res.json({ conexion: 'OK', resultado: rows[0].resultado });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    res.status(500).json({ error: 'Error de conexión con la base de datos' });
  }
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en http://0.0.0.0:${PORT}`);
});

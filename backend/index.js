// backend/index.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db'); // importamos la conexión a MySQL

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
    console.error(error);
    res.status(500).json({ conexion: 'ERROR', detalle: error.message });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
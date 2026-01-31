// backend/src/config/db.js
require('dotenv').config();
const mysql = require('mysql2/promise');

// Crear un pool de conexiones con configuración completa
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,       // ✅ espera si no hay conexiones disponibles
  connectionLimit: 10,            // ✅ máximo de conexiones simultáneas
  queueLimit: 0                   // ✅ sin límite de espera en cola
});

module.exports = pool;
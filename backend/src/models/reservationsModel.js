const pool = require('../config/db');

// Crear una reserva
exports.create = async ({ roomId, name, phone, date, duration }) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO reservations (room_id, name, phone, date, duration) VALUES (?, ?, ?, ?, ?)',
      [roomId, name, phone, date, duration]
    );

    return {
      success: true,
      reservationId: result.insertId,
      roomId,
      name,
      phone,
      date,
      duration
    };
  } catch (error) {
    console.error('Error en reservationsModel.create:', error);
    throw error; // lo maneja el controlador
  }
};

// Obtener todas las reservas
exports.getAll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservations');
    return rows;
  } catch (error) {
    console.error('Error en reservationsModel.getAll:', error);
    throw error;
  }
};

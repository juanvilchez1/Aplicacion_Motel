const reservationsModel = require('../models/reservationsModel');

exports.createReservation = async (req, res) => {
  try {
    const { roomId, name, phone, date, duration } = req.body;

    // Validación básica
    if (!roomId || !name || !phone || !date || !duration) {
      return res.status(400).json({ success: false, error: 'Campos incompletos' });
    }

    const reservation = await reservationsModel.create({ roomId, name, phone, date, duration });

    res.json({
      success: true,
      ...reservation
    });
  } catch (error) {
    console.error('Error en createReservation:', error);
    res.status(500).json({ success: false, error: 'Error al crear reserva' });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await reservationsModel.getAll();
    res.json(reservations);
  } catch (error) {
    console.error('Error en getReservations:', error);
    res.status(500).json({ success: false, error: 'Error al obtener reservas' });
  }
};

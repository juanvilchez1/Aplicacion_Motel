// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Formato de autorización inválido. Se requiere Bearer Token' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Validar que el token tenga los campos esperados
    if (!decoded.id || !decoded.rol_id) {
      return res.status(403).json({ error: 'Token inválido: datos incompletos' });
    }

    req.user = decoded; // guarda info del usuario en la request
    next();
  } catch (error) {
    console.error("Error verificando token:", error.message);
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
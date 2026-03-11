// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Validar formato del header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Formato de autorización inválido. Se requiere Bearer Token' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');

    // Validar campos esperados en el token
    if (!decoded.id || !decoded.rol_id) {
      return res.status(403).json({ error: 'Token inválido: datos incompletos' });
    }

    // Guardar datos del usuario en la request para uso posterior
    req.user = {
      id: decoded.id,
      rol_id: decoded.rol_id,
      nombre: decoded.nombre,
      correo: decoded.correo
    };

    next(); // continuar con la ruta protegida
  } catch (error) {
    console.error("Error verificando token:", error.message);
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
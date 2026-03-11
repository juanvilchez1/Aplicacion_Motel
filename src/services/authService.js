// frontend/src/services/authService.js
import axios from 'axios';
import API_URL from '../config/api';

// Registro de usuario
export const register = async (nombre, correo, contraseña, rol_id) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      nombre,
      correo,
      contraseña,
      rol_id, // obligatorio para el backend
    });
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error.response?.data || { error: "Error desconocido en registro" };
  }
};

// Login de usuario
export const login = async (correo, contraseña) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      correo,
      contraseña,
    });
    return response.data; // debe incluir el token JWT
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error.response?.data || { error: "Error desconocido en login" };
  }
};

// Validación asíncrona: verificar si el correo ya existe
export const checkEmailExists = async (correo) => {
  try {
    const response = await axios.post(`${API_URL}/auth/check-email`, { correo });
    return response.data.exists; // el backend debe devolver { exists: true/false }
  } catch (error) {
    console.error("Error verificando correo:", error.response?.data || error.message);
    throw error.response?.data || { error: "Error desconocido al verificar correo" };
  }
};
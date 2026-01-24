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
      rol_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error;
  }
};

// Login de usuario
export const login = async (correo, contraseña) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      correo,
      contraseña,
    });
    return response.data; // aquí recibirás el token JWT
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};
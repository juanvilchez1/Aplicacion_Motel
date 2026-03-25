import API_URL from "../config/api";

const reservationService = {
  async createReservation(reservation) {
    try {
      // 👇 Ajustado: solo /reservations
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation),
      });

      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error("Respuesta no es JSON:", text);
        return { success: false, error: "Respuesta inválida del servidor" };
      }
    } catch (error) {
      console.error("Error en createReservation:", error);
      return { success: false, error: error.message };
    }
  },

  async getReservations() {
    try {
      // 👇 Igual aquí
      const response = await fetch(`${API_URL}/reservations`);
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error("Respuesta no es JSON:", text);
        return [];
      }
    } catch (error) {
      console.error("Error en getReservations:", error);
      return [];
    }
  }
};

export default reservationService;

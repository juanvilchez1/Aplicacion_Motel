import API_URL from "../config/api";

const reservationService = {
  async createReservation(reservation) {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation),
    });
    return response.json();
  },

  async getReservations() {
    const response = await fetch(`${API_URL}/reservations`);
    return response.json();
  }
};

export default reservationService;
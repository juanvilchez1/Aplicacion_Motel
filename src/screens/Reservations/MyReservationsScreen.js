import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import reservationService from '../../services/reservationService';

export default function MyReservationsScreen({ navigation }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await reservationService.getReservations();
        setReservations(data);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
      }
    };
    fetchReservations();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Reserva #{item.id}</Text>
      <Text>Habitación ID: {item.room_id}</Text>
      <Text>Cliente: {item.name}</Text>
      <Text>Teléfono: {item.phone}</Text>
      <Text>Fecha: {item.date}</Text>
      <Text>Duración: {item.duration}</Text>
      <Text>Estado: {item.status}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReservationConfirmation', { reservation: item })}
      >
        <Text style={styles.buttonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Mis Reservas</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  button: { marginTop: 10, backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' }
});
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ReservationConfirmationScreen({ route, navigation }) {
  const { reservation } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>✅ Reserva confirmada</Text>
      <Text>Habitación: {reservation.roomId}</Text>
      <Text>Fecha: {reservation.date}</Text>
      <Text>Duración: {reservation.duration}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={{ color: 'blue' }}>Volver al Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}
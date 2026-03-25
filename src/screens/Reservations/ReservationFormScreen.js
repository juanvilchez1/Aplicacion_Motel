import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import reservationService from '../../services/reservationService';

export default function ReservationFormScreen({ route, navigation }) {
  const { room } = route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');

  const handleReservation = async () => {
    if (!name || !phone || !date || !duration) {
      Alert.alert("Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    try {
      const reservation = { roomId: room.id, name, phone, date, duration };
      const result = await reservationService.createReservation(reservation);

      if (result?.success) {
        Alert.alert("✅ Reserva confirmada", "Tu reserva se guardó correctamente.");
        navigation.navigate('ReservationConfirmation', { reservation: result });
      } else {
        Alert.alert("❌ Error", "No se pudo guardar la reserva.");
      }
    } catch (error) {
      console.error("Error al guardar reserva:", error);
      Alert.alert("❌ Error", "Ocurrió un problema al conectar con el servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Reserva</Text>
      <Text style={styles.subtitle}>Reserva para: {room.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Duración (horas/días)"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.button} onPress={handleReservation}>
        <Text style={styles.buttonText}>Confirmar Reserva</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  button: { backgroundColor: '#228B22', padding: 15, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});

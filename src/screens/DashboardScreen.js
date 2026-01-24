// frontend/src/screens/DashboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ navigation }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      setToken(savedToken || 'No hay token guardado');
    };
    getToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // ✅ borrar token
    navigation.navigate('Login');           // ✅ volver al login
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Bienvenido al Dashboard
      </Text>
      <Text style={{ marginBottom: 20 }}>
        Token guardado: {token}
      </Text>

      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}
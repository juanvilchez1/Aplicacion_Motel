import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles';

export default function DashboardScreen({ navigation }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      setToken(savedToken || '');
    };
    getToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bienvenido al Dashboard</Text>

      {token ? (
        <Text style={{ color: '#228B22', marginBottom: 20 }}>
          ✅ Token guardado: {token}
        </Text>
      ) : (
        <Text style={{ color: 'red', marginBottom: 20 }}>
          ❌ No hay token guardado
        </Text>
      )}

      <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles';
import API_URL from "../config/api";

export default function DashboardScreen({ navigation }) {
  const [token, setToken] = useState('');
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const verificarSesion = async () => {
      const savedToken = await AsyncStorage.getItem('token');

      if (!savedToken) {
        navigation.replace('Login'); // redirige si no hay token
      } else {
        setToken(savedToken); // guarda el token en estado

        try {
          const response = await fetch(`${API_URL}/test-db`, {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          const data = await response.json();
          console.log("Respuesta del backend:", data);
          setBackendData(data); // guarda la respuesta para mostrarla en pantalla
        } catch (error) {
          console.error("Error al conectar con backend:", error);
        }
      }
    };

    verificarSesion();
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

      {backendData ? (
        <Text style={{ color: '#000080', marginBottom: 20 }}>
          🔗 Respuesta del servidor: {JSON.stringify(backendData)}
        </Text>
      ) : (
        <Text style={{ color: 'gray', marginBottom: 20 }}>
          Esperando respuesta del servidor...
        </Text>
      )}

      {/* Botón para probar la cámara */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Camera')}
      >
        <Text style={globalStyles.buttonText}>Probar Cámara</Text>
      </TouchableOpacity>

      {/* Botón para probar la ubicación */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Location')}
      >
        <Text style={globalStyles.buttonText}>Probar Ubicación</Text>
      </TouchableOpacity>

      {/* Botón para ver habitaciones disponibles */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('RoomList')}
      >
        <Text style={globalStyles.buttonText}>📋 Habitaciones</Text>
      </TouchableOpacity>

      {/* Botón para ver mis reservas */}
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('MyReservations')}
      >
        <Text style={globalStyles.buttonText}>📂 Mis Reservas</Text>
      </TouchableOpacity>

      {/* Botón para cerrar sesión */}
      <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

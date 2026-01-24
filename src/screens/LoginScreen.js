// frontend/src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { login } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async () => {
    try {
      const data = await login(correo, contraseña);

      // ✅ Guardar token en AsyncStorage
      await AsyncStorage.setItem('token', data.token);

      setMensaje("Login exitoso, token guardado en el dispositivo");

      // ✅ Redirigir al Dashboard (pantalla protegida)
      navigation.navigate('Dashboard');
    } catch (error) {
      setMensaje(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />

      {mensaje ? <Text style={{ marginTop: 15 }}>{mensaje}</Text> : null}

      {/* ✅ Botón para ir a la pantalla de registro */}
      <Button
        title="Ir a Registro"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
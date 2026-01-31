import React, { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { login } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const correoRef = useRef(null);
  const contraseñaRef = useRef(null);

  const handleLogin = async () => {
    try {
      const data = await login(correo, contraseña);
      await AsyncStorage.setItem('token', data.token);
      setMensaje("✅ Login exitoso, token guardado en el dispositivo");
      navigation.navigate('Dashboard');
    } catch (error) {
      setMensaje(error.response?.data?.error || "❌ Error al iniciar sesión: correo o contraseña incorrectos");
      correoRef.current.focus();
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Título grande */}
      <Text style={globalStyles.title}>Inicio de Sesión</Text>

      {/* Campos de entrada */}
      <TextInput
        ref={correoRef}
        style={globalStyles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />

      <TextInput
        ref={contraseñaRef}
        style={globalStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />

      {/* Botón de login */}
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {mensaje ? <Text style={{ marginTop: 15, textAlign: 'center' }}>{mensaje}</Text> : null}

      {/* Botón ir a registro */}
      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={globalStyles.buttonText}>Ir a Registro</Text>
      </TouchableOpacity>
    </View>
  );
}
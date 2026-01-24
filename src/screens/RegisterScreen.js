// frontend/src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { register } from '../services/authService';

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol_id, setRolId] = useState('1'); // por defecto admin
  const [mensaje, setMensaje] = useState('');

  const handleRegister = async () => {
    try {
      const data = await register(nombre, correo, contraseña, rol_id);
      setMensaje(data.mensaje || "Usuario registrado correctamente");

      // ✅ después de registrar, puedes redirigir automáticamente a Login
      // navigation.navigate('Login');
    } catch (error) {
      setMensaje(error.response?.data?.error || "Error al registrar usuario");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
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
      <TextInput
        placeholder="Rol ID (ej: 1)"
        value={rol_id}
        onChangeText={setRolId}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />

      <Button title="Registrar" onPress={handleRegister} />

      {mensaje ? <Text style={{ marginTop: 15 }}>{mensaje}</Text> : null}

      {/* ✅ Botón para volver a Login */}
      <Button
        title="Volver a Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}
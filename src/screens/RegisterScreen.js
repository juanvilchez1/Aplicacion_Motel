import React, { useState, useCallback, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { registerSchema } from '../validacion/esquema_registro';
import { register, checkEmailExists } from '../services/authService';
import { globalStyles } from '../styles';
import debounce from 'lodash/debounce';

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmPassword: '',
    rol_id: '1', // ✅ rol fijo para registro
  });
  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState('');

  const nombreRef = useRef(null);
  const correoRef = useRef(null);
  const contraseñaRef = useRef(null);
  const confirmRef = useRef(null);

  const validateEmailAsync = useCallback(
    debounce(async (email) => {
      try {
        const exists = await checkEmailExists(email);
        if (exists) {
          setErrors((prev) => ({
            ...prev,
            correo: "Este correo ya está registrado. Usa otro correo."
          }));
        }
      } catch (err) {
        console.log("Error validando correo:", err);
      }
    }, 500), []
  );

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === "correo") {
      validateEmailAsync(value);
    }
  };

  const handleRegister = async () => {
    try {
      // ahora valida también rol_id
      registerSchema.parse(formData);

      const data = await register(
        formData.nombre,
        formData.correo,
        formData.contraseña,
        formData.rol_id // se envía correctamente
      );

      setMensaje(data.mensaje || "✅ Usuario registrado correctamente");
    } catch (error) {
      if (error.errors) {
        const formattedErrors = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(formattedErrors);

        if (formattedErrors.nombre) nombreRef.current.focus();
        else if (formattedErrors.correo) correoRef.current.focus();
        else if (formattedErrors.contraseña) contraseñaRef.current.focus();
        else if (formattedErrors.confirmPassword) confirmRef.current.focus();
        else if (formattedErrors.rol_id) setMensaje("❌ Falta el rol_id");
      } else {
        setMensaje(error.response?.data?.error || "❌ Error al registrar usuario. Intenta nuevamente.");
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Título grande */}
      <Text style={globalStyles.title}>Registro de Usuario</Text>

      {/* Campos de entrada */}
      <TextInput
        ref={nombreRef}
        style={globalStyles.input}
        placeholder="Nombre"
        value={formData.nombre}
        onChangeText={(value) => handleChange("nombre", value)}
      />
      {errors.nombre && <Text style={{ color: 'red' }}>❌ {errors.nombre}</Text>}

      <TextInput
        ref={correoRef}
        style={globalStyles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.correo}
        onChangeText={(value) => handleChange("correo", value)}
      />
      {errors.correo && <Text style={{ color: 'red' }}>❌ {errors.correo}</Text>}

      <TextInput
        ref={contraseñaRef}
        style={globalStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={formData.contraseña}
        onChangeText={(value) => handleChange("contraseña", value)}
      />
      {errors.contraseña && <Text style={{ color: 'red' }}>❌ {errors.contraseña}</Text>}

      <TextInput
        ref={confirmRef}
        style={globalStyles.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={formData.confirmPassword}
        onChangeText={(value) => handleChange("confirmPassword", value)}
      />
      {errors.confirmPassword && <Text style={{ color: 'red' }}>❌ {errors.confirmPassword}</Text>}

      {/* Botón de registro */}
      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      {mensaje ? <Text style={{ marginTop: 15, textAlign: 'center' }}>{mensaje}</Text> : null}

      {/* Botón volver */}
      <TouchableOpacity style={globalStyles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.buttonText}>Volver a Login</Text>
      </TouchableOpacity>
    </View>
  );
}
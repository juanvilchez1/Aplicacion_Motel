import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles';

export default function HomeWelcome({ navigation }) {
  return (
    <View style={globalStyles.container}>
      {/* Título grande con estilo distinto */}
      <Text
        style={[
          globalStyles.title,
          { fontSize: 32, marginBottom: 25, color: '#2c3e50' },
        ]}
      >
        ¡Bienvenido a MotelBooking!
      </Text>

      {/* Texto explicativo más personal */}
      <Text
        style={[
          globalStyles.text,
          { fontSize: 18, textAlign: 'center', marginBottom: 40 },
        ]}
      >
        Tu sesión se ha iniciado correctamente.{"\n"}
        Ahora puedes explorar nuestras reservas, promociones y servicios exclusivos.
      </Text>

      {/* Botón principal para ir al dashboard */}
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            width: '80%',
            alignSelf: 'center',
            marginBottom: 20,
            backgroundColor: '#27ae60',
          },
        ]}
        onPress={() => navigation.replace('Dashboard')}
      >
        <Text style={globalStyles.buttonText}>Ir a Reservas</Text>
      </TouchableOpacity>

      {/* Botón secundario para ver perfil */}
      <TouchableOpacity
        style={[
          globalStyles.button,
          {
            width: '80%',
            alignSelf: 'center',
            backgroundColor: '#2980b9',
          },
        ]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={globalStyles.buttonText}>Ver mi Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}
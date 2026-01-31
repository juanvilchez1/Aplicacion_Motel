import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles';

export default function OnboardingWelcome({ navigation }) {
  return (
    <View style={globalStyles.container}>
      {/* Título grande */}
      <Text style={[globalStyles.title, { fontSize: 30, marginBottom: 20 }]}>
        MotelBooking App
      </Text>

      {/* Texto explicativo mediano y centrado */}
      <Text style={[globalStyles.text, { fontSize: 18, textAlign: 'center', marginBottom: 30 }]}>
        Descubre cómo reservar y aprovechar nuestros servicios.
      </Text>

      {/* Botones uniformes */}
      <TouchableOpacity 
        style={[globalStyles.button, { width: '80%', alignSelf: 'center', marginBottom: 15 }]} 
        onPress={() => navigation.navigate('OnboardingBenefits')}
      >
        <Text style={globalStyles.buttonText}>Siguiente</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[globalStyles.button, { width: '80%', alignSelf: 'center' }]} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={globalStyles.buttonText}>Saltar</Text>
      </TouchableOpacity>
    </View>
  );
}
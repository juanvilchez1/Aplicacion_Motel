import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles';

export default function OnboardingBenefits({ navigation }) {
  return (
    <View style={globalStyles.container}>
      {/* Título grande */}
      <Text style={[globalStyles.title, { fontSize: 30, marginBottom: 20 }]}>
        Beneficios de nuestra aplicación
      </Text>

      {/* Texto explicativo mediano y centrado */}
      <Text style={[globalStyles.text, { fontSize: 18, textAlign: 'center', marginBottom: 30 }]}>
        • Reserva rápida y segura{"\n"}
        • Promociones exclusivas{"\n"}
        • Atención personalizada
      </Text>

      {/* Botones uniformes */}
      <TouchableOpacity 
        style={[globalStyles.button, { width: '80%', alignSelf: 'center', marginBottom: 15 }]} 
        onPress={() => navigation.goBack()}
      >
        <Text style={globalStyles.buttonText}>Atrás</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[globalStyles.button, { width: '80%', alignSelf: 'center', marginBottom: 15 }]} 
        onPress={() => navigation.navigate('OnboardingPermissions')}
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
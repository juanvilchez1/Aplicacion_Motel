import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { requestLocationPermission, getCurrentLocation } from '../services/locationService';
import { globalStyles } from '../styles';

export default function LocationScreen() {
  const [coords, setCoords] = useState(null);

  const handleLocation = async () => {
    const granted = await requestLocationPermission();
    if (!granted) {
      alert("Permiso de ubicación denegado");
      return;
    }
    try {
      const position = await getCurrentLocation();
      setCoords(position.coords);
    } catch (error) {
      alert("Error obteniendo ubicación: " + error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={globalStyles.button} onPress={handleLocation}>
        <Text style={globalStyles.buttonText}>Obtener Ubicación</Text>
      </TouchableOpacity>
      {coords && (
        <Text style={globalStyles.text}>
          Latitud: {coords.latitude}, Longitud: {coords.longitude}
        </Text>
      )}
    </View>
  );
}
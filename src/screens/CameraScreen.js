import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { openCamera } from '../services/cameraService';
import { globalStyles } from '../styles';

export default function CameraScreen() {
  const [photo, setPhoto] = useState(null);

  const handleCamera = async () => {
    try {
      const result = await openCamera();
      setPhoto(result.uri);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity style={globalStyles.button} onPress={handleCamera}>
        <Text style={globalStyles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
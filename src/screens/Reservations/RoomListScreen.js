import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const rooms = [
  { id: '1', name: 'Suite Romántica', price: 50, image: require('../../assets/room1.jpg') },
  { id: '2', name: 'Habitación Deluxe', price: 70, image: require('../../assets/room2.jpg') },
];

export default function RoomListScreen({ navigation }) {
  return (
    <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ margin: 10 }}>
          <Image source={item.image} style={{ width: '100%', height: 150 }} />
          <Text>{item.name}</Text>
          <Text>${item.price} / noche</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ReservationForm', { room: item })}
          >
            <Text style={{ color: 'blue' }}>Reservar</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
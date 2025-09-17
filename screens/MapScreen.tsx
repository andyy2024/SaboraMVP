import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

const restaurants = require('../assets/data/restaurants.json');

export default function MapScreen({ navigation }) {

  const insets = useSafeAreaInsets();


  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom:10 }}>
      <MapView
        style={{ flex: 1, marginHorizontal: 12, borderRadius: 12 }}
        initialRegion={{
          latitude: 4.7110,
          longitude: -74.0721,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {restaurants.map((r) => (
          <Marker
            key={r.id}
            coordinate={{ latitude: r.coords.lat, longitude: r.coords.lng }}
            title={r.name}
            description={`${r.rating} · ${r.priceRange}`}
            onPress={() => {
              navigation.navigate('Restaurant', { id: r.id });
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

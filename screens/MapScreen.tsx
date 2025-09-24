import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import MapCard from '../components/MapCard';

const restaurants = require('../assets/data/restaurants.json');

export default function MapScreen({ navigation }) {

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8, paddingBottom: 10 }}>
      <MapCard navigation={navigation}></MapCard>
    </View>
  );
}
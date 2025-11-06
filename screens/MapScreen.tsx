import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import MapCard from '../components/MapCard';
import { StatusBar } from 'expo-status-bar';

const restaurants = require('../assets/data/restaurants.json');

export default function MapScreen({ navigation }) {

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: 0, paddingBottom: 0 }}>
      <StatusBar style="dark" />
      <MapCard navigation={navigation}></MapCard>
    </View>
  );
}
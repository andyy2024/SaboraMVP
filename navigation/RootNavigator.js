import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import RestaurantScreen from '../screens/RestaurantScreen';
import DishScreen from '../screens/DishScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ title: 'Restaurante' }} />
      <Stack.Screen name="Dish" component={DishScreen} options={{ title: 'Plato' }} />
      <Stack.Screen name="FullMap" component={MapScreen} options={{ title: 'Mapa' }} />
    </Stack.Navigator>
  );
}

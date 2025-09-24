import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: 'flex',
        tabBarActiveTintColor: '#E0B0FF',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" size={20} color={color} /> }}
      />
      <Tab.Screen 
        name="MapTab" 
        component={MapScreen}
        options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="map-marked-alt" size={20} color={color} /> }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="search" size={20} color={color} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={20} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

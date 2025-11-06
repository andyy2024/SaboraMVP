import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';
import CarouselSimple from '../components/CarouselSimple';
import FiltersModal from '../components/FiltersModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import MapCard from '../components/MapCard';
const restaurantsData = require('../assets/data/restaurants.json');
const dishesData = require('../assets/data/dishes.json');
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [barFocus, setbarFocus] = useState(false);

  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();


  useEffect(() => {
    // preload or logic
  }, []);

  return (

    <View className='flex-1 bg-purple-100'>
      {isFocused && <StatusBar style="light" />}

      <View style={{ flex: 1, paddingTop: insets.top + 12, paddingBottom: insets.bottom }}>

        <View className="items-center pb-6 rounded-b-[20px]">
          <SearchBar value={query} onChange={setQuery} onFocus={() => { }} />
        </View>



        <ScrollView className="flex-1 bg-transparent">
          <View className="mx-4">
            <Text className="text-2xl font-bold mt-2">Descubre</Text>
          </View>

          <View className="mx-4 my-3 rounded-xl overflow-hidden bg-white shadow p-3">
            <View className="h-40">
              <MapCard navigation={navigation}></MapCard>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MapTab')} className="mt-3 bg-white border border-gray-300 rounded px-4 py-2 self-end">
              <Text>Ver mapa completo</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <View className="mx-4 flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Restaurantes cerca de ti</Text>
              <Text className="text-sm text-gray-500">Ver todos</Text>
            </View>

            <FlatList
              className="mt-3 px-4"
              data={restaurantsData}
              horizontal
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <RestaurantCard item={item} onPress={() => navigation.navigate('Restaurant', { id: item.id })} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View className="mt-6">
            <View className="mx-4 flex-row justify-between items-center">
              <Text className="text-lg font-semibold">Platos mejor calificados</Text>
            </View>

            <FlatList
              className="mt-3 px-4"
              data={dishesData}
              horizontal
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <DishCard item={{ ...item, restaurantName: restaurantsData.find(r => r.id === item.restaurantId)?.name }} onPress={() => navigation.navigate('Dish', { id: item.id })} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    </View>

  );
}

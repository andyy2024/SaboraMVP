import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import DishCard from '../components/DishCard';
import CarouselSimple from '../components/CarouselSimple';
import FiltersModal from '../components/FiltersModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
const restaurantsData = require('../assets/data/restaurants.json');
const dishesData = require('../assets/data/dishes.json');

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const insets = useSafeAreaInsets();


  useEffect(() => {
    // preload or logic
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 12, paddingBottom: 0 }}>
      <ScrollView className="flex-1 bg-gray-50">
        <SearchBar value={query} onChange={setQuery} onFocus={() => { }} />
        <View className="mx-4">
          <Text className="text-2xl font-bold mt-2">Descubre</Text>
        </View>

        <View className="mx-4 my-3 rounded-xl overflow-hidden bg-white shadow p-3">
          <View className="h-40">
            <MapView
              style={{ flex: 1, marginHorizontal: 5, borderRadius: 12 }}
              initialRegion={{
                latitude: 4.7110,
                longitude: -74.0721,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {restaurantsData.map((r) => (
                <Marker
                  key={r.id}
                  coordinate={{ latitude: r.coords.lat, longitude: r.coords.lng }}
                  title={r.name}
                  description={`${r.rating} · ${r.price}`}
                  onPress={() => {
                    navigation.navigate('Restaurant', { id: r.id });
                  }}
                />
              ))}
            </MapView>
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

        <View className="mt-6 mx-4">
          <Text className="text-lg font-semibold text-gray-800">Categorías populares</Text>
          <View className="mt-4 flex-row flex-wrap">
            {['Ramen', 'Vegano', 'Pet Friendly', 'Desayuno', 'Comida rápida', 'Cafetería'].map((c) => (
              <TouchableOpacity
                key={c}
                className="px-4 py-2 mr-2 mb-2 bg-gray-100 rounded-full items-center justify-center"
              >
                <Text className="text-sm font-medium text-gray-700">{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

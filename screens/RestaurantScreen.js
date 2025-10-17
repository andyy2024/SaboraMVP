import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import CarouselSimple from '../components/CarouselSimple';
import RatingStars from '../components/RatingStars';
import { FontAwesome5 } from '@expo/vector-icons';
import { imageMap } from '../assets/imageMap.mjs';

const restaurants = require('../assets/data/restaurants.json');
const dishes = require('../assets/data/dishes.json');

export default function RestaurantScreen({ route, navigation }) {
  const { id } = route.params;
  const restaurant = restaurants.find(r => r.id === id);
  const popular = dishes.filter(d => d.restaurantId === id).slice(0,5);

  if (!restaurant) return <View className="flex-1 items-center justify-center"><Text>No encontrado</Text></View>;

  return (
    <ScrollView className="flex-1 bg-white">
      <CarouselSimple images={imageMap[restaurant.name].main} />
      <View className="p-4">
        <View className="flex-row justify-between items-start">
          <View style={{ flex: 1 }}>
            <Text className="text-2xl font-bold">{restaurant.name}</Text>
            <Text className="text-sm text-gray-500 mt-1">{restaurant.cuisine} · {restaurant.price}</Text>
            <View className="mt-2"><RatingStars rating={restaurant.rating} /></View>
          </View>
        </View>

        <View className="mt-4 flex-row justify-between">
          <TouchableOpacity className="px-4 py-2 bg-amber-100 rounded flex-row items-center"><FontAwesome5 name="phone" /><Text className="ml-2">Llamar</Text></TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 bg-blue-100 rounded flex-row items-center"><FontAwesome5 name="directions" /><Text className="ml-2">Cómo llegar</Text></TouchableOpacity>
          <TouchableOpacity className="px-4 py-2 bg-gray-100 rounded flex-row items-center"><FontAwesome5 name="share-alt" /><Text className="ml-2">Compartir</Text></TouchableOpacity>
        </View>

        <View className="mt-4">
          <Text className="font-semibold">Servicios</Text>
          <View className="flex-row mt-2">
            {restaurant.services.map(f => <View key={f} className="mr-3 items-center"><Text>{f}</Text></View>)}
          </View>
        </View>

        <View className="mt-4">
          <Text className="font-semibold">Tags</Text>
          <View className="flex-row mt-2">
            {restaurant.tags.map(f => <View key={f} className="mr-3 items-center"><Text>{f}</Text></View>)}
          </View>
        </View>

        <View className="mt-6">
          <Text className="font-semibold text-lg">Lo más popular</Text>
          <FlatList horizontal data={popular} keyExtractor={i => i.id} renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Dish', { id: item.id })} className="mr-4 mt-3 w-56 bg-white shadow rounded-xl overflow-hidden">
              <Image source={imageMap[restaurant.name].dishes[item.name].main[0]} className="h-32 w-full" />
              <View className="p-2">
                <Text className="font-semibold">{item.name}</Text>
                <Text className="text-sm text-gray-500">uwu</Text>
                <RatingStars rating={item.rating} size={10} />
              </View>
            </TouchableOpacity>
          )} />
        </View>

        <View className="mt-6">
          <Text className="font-semibold text-lg">Menú</Text>
          {restaurant.menuCategories?.map(cat => (
            <View key={cat.title} className="mt-3">
              <Text className="font-semibold">{cat.title}</Text>
              {cat.dishes.map(did => {
                const dish = dishes.find(d => d.id === did);
                if (!dish) return null;
                return (
                  <TouchableOpacity key={did} onPress={() => navigation.navigate('Dish', { id: dish.id })} className="flex-row items-center justify-between mt-2 bg-white p-2 rounded shadow-sm">
                    <View className="flex-row items-center">
                      <Image source={imageMap[restaurant.name].dishes[dish.name].main[0]} className="h-12 w-12 rounded" />
                      <View className="ml-3">
                        <Text className="font-medium">{dish.name}</Text>
                        <Text className="text-sm text-gray-500">uwu</Text>
                      </View>
                    </View>
                    <RatingStars rating={dish.rating} size={12} />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <View className="mt-8 mb-20">
          <Text className="font-semibold text-lg">Reseñas</Text>
          {/* simple reviews list placeholder */}
          <View className="mt-3">
            <View className="bg-gray-50 p-3 rounded">
              <Text className="font-medium">Ana · 2025-08-12</Text>
              <RatingStars rating={5} />
              <Text className="mt-2">Muy buena experiencia, el caldo es increíble.</Text>
            </View>
          </View>
        </View>
      </View>

      {/* FAB */}
      <TouchableOpacity onPress={() => {navigation.navigate('ReviewForm', { id })}} className="absolute bottom-6 right-6 bg-green-600 p-4 rounded-full shadow-lg">
        <FontAwesome5 name="pen" color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

import React from 'react';
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import RatingStars from '../components/RatingStars';
const dishes = require('../assets/data/dishes.json');
const restaurants = require('../assets/data/restaurants.json');
const reviews = require('../assets/data/reviews.json');
import CarouselSimple from '../components/CarouselSimple';
import { imageMap } from '../assets/imageMap.mjs';

export default function DishScreen({ route, navigation }) {
  const { id } = route.params;
  const dish = dishes.find(d => d.id === id);
  const restaurant = restaurants.find(r => r.id === dish.restaurantId);

  if (!dish) return <View className="flex-1 items-center justify-center"><Text>No encontrado</Text></View>;

  return (
    <ScrollView className="flex-1 bg-white">
      <CarouselSimple images={imageMap[restaurant.name]?.dishes?.[dish.name]} />
      <View className="p-4">
        <Text className="text-2xl font-bold">{dish.name}</Text>
        <Text className="text-sm text-gray-500 mt-1">{restaurant?.name}</Text>
        <View className="mt-2">
          {/* <RatingStars rating={dish.rating} size={12} /> */}
          </View>
        <Text className="text-lg font-semibold mt-4">${dish.price}</Text>

        <View className="mt-6">
          <Text className="font-semibold">Galería de usuarios</Text>
          <FlatList horizontal data={dish.images} keyExtractor={(p, i) => String(i)} renderItem={({ item }) => (
            <Image source={{ uri: item }} className="h-32 w-32 mr-3" />
          )} />
        </View>

        <View className="mt-6">
          <Text className="font-semibold">Reseñas del plato</Text>
          {dish.reviews?.map(rid => {
            
            const r = reviews.find(item => item.id === rid);
            return (
            <View key={r.id} className="mt-3 bg-gray-50 p-3 rounded">
              <Text className="font-medium">{r.user} · {r.date}</Text>
              <RatingStars rating={r.rating} size={12} />
              <Text className="mt-2">{r.comment}</Text>
            </View>
          )}
          
          )}
        </View>
      </View>
    </ScrollView>
  );
}

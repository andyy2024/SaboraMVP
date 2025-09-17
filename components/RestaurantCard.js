import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';

export default function RestaurantCard({ item, onPress }) {
  const img = item.images && item.images.length > 0
  ? { uri: item.images[0] }
  : null;
  
  return (
    <TouchableOpacity onPress={onPress} className="w-72 mr-4 rounded-xl overflow-hidden bg-white shadow">
      <Image source={img} className="h-40 w-full" resizeMode="cover" />
      <View className="p-3">
        <Text className="text-lg font-semibold">{item.name}</Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-sm text-gray-500">{item.cuisine} · {item.price}</Text>
          <Text className="text-sm text-gray-500">{item.distance_km} km</Text>
        </View>
        <View className="mt-2">
          <RatingStars rating={item.rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

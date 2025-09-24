import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';
import { imageMap } from '../assets/imageMap.mjs';

export default function DishCard({ item, onPress }) {

  return (
    <TouchableOpacity onPress={onPress} className="w-56 mr-4 rounded-xl overflow-hidden bg-white shadow">
      <Image source={imageMap[item.restaurantName].dishes[item.name].main[0]} className="h-32 w-full" resizeMode="cover" />
      <View className="p-2">
        <Text className="font-semibold">{item.name}</Text>
        <Text className="text-sm text-gray-500">{item.restaurantName}</Text>
        <View className="mt-1">
          <RatingStars rating={item.rating} size={10} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

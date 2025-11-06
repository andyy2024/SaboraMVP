import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';
import { imageMap } from '../assets/imageMap.mjs';


export default function RestaurantCard({ item, onPress }) {

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-72 mr-4 rounded-xl overflow-hidden bg-white shadow"
    >
      <Image
        source={imageMap[item.name]?.main[0]}
        className="h-40 w-full"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-lg font-semibold">{item.name}</Text>

        {/* Chips de cuisines */}
        <View className="flex-row flex-wrap mt-1">
          {item.cuisine.map((c, idx) => (
            <View
              key={idx}
              className="bg-gray-100 px-2 py-1 rounded-full mr-2 mb-2"
            >
              <Text className="text-xs text-gray-700">{c}</Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-sm text-gray-500">{item.price}</Text>
          <Text className="text-sm text-gray-500">{item.distance_km} km</Text>
        </View>

        <View className="mt-2">
          <RatingStars rating={item.rating} />
        </View>
      </View>
    </TouchableOpacity>

  );
}

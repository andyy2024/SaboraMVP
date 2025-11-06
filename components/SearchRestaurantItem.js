import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { imageMap } from '../assets/imageMap.mjs';

export default function SearchRestaurantItem({ restaurant, onPress }) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-4 border-b border-gray-200"
      onPress={onPress}
    >
      <Image
        source={imageMap[restaurant.image]}
        className="w-10 h-10 rounded-lg mr-3"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">{restaurant.name}</Text>
        <View className="flex-row items-center mt-0.5">
          <Text className="text-gray-500 text-sm mr-1">{restaurant.category}</Text>
          <Star size={14} color="#facc15" fill="#facc15" />
          <Text className="text-gray-700 text-sm ml-1">
            {restaurant.rating.toFixed(1)} <Text className="text-gray-400">({restaurant.reviews})</Text>
          </Text>
        </View>
      </View>
      <View className="bg-purple-100 px-2 py-0.5 rounded-full">
        <Text className="text-purple-600 text-xs font-medium">Restaurante</Text>
      </View>
    </TouchableOpacity>
  );
}

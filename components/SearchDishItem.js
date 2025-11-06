import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { imageMap } from '../assets/imageMap.mjs';

export default function SearchDishItem({ dish, onPress }) {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-4 border-b border-gray-200"
      onPress={onPress}
    >
      <Image
        source={imageMap[dish.image]}
        className="w-10 h-10 rounded-lg mr-3"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-900">{dish.name}</Text>
        <View className="flex-row items-center mt-0.5">
          <Text className="text-gray-500 text-sm mr-1">{dish.restaurantName}</Text>
          <Star size={14} color="#facc15" fill="#facc15" />
          <Text className="text-gray-700 text-sm ml-1">
            {dish.rating.toFixed(1)} <Text className="text-gray-400">({dish.reviews})</Text>
          </Text>
        </View>
      </View>
      <View className="bg-purple-100 px-2 py-0.5 rounded-full">
        <Text className="text-purple-600 text-xs font-medium">Plato</Text>
      </View>
    </TouchableOpacity>
  );
}

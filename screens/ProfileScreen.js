import React from 'react';
import { ScrollView, Image, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const user = require('../assets/data/user.json');

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 24, paddingHorizontal: 16 }}>
      <View className="items-center">
        <Image source={{ uri: 'https://placehold.co/100x100' }} className="w-24 h-24 rounded-full" />
        <Text className="mt-3 text-xl font-bold">Andrés</Text>
        <Text className="text-sm text-gray-500">andres.botero@example.com</Text>
      </View>

      <View className="mt-6">
        <Text className="font-semibold text-lg">Mis reseñas</Text>
        <View className="mt-3 p-4 bg-white rounded-xl shadow">
          <Text className="text-gray-500">Aquí aparecerán tus reseñas (mock)</Text>
        </View>
      </View>

      <View className="mt-6">
        <Text className="font-semibold text-lg">Favoritos</Text>
        <View className="mt-3 p-4 bg-white rounded-xl shadow">
          <Text className="text-gray-500">Restaurantes guardados (mock)</Text>
        </View>
      </View>
    </ScrollView>
  );
}

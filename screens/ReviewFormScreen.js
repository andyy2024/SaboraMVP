import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RatingStars from '../components/RatingStars';

export default function ReviewFormScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);

  const onPublish = () => {
    // como no hay backend, solo simulamos publicar y volvemos atrás
    // aquí agregarías lógica para guardar en AsyncStorage o subir a backend
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 20, paddingHorizontal: 16 }}>
      <Text className="text-xl font-bold">Escribir reseña</Text>

      <View className="mt-4">
        <Text className="text-sm text-gray-600">Calificación</Text>
        <RatingStars rating={rating} />
      </View>

      <View className="mt-4">
        <Text className="text-sm text-gray-600">Opinión</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Cuenta tu experiencia..."
          multiline
          className="mt-2 p-3 bg-white rounded-xl h-32 text-base"
        />
      </View>

      <View className="mt-4">
        <Text className="text-sm text-gray-600">Fotos</Text>
        <View className="mt-2 flex-row space-x-3">
          {/* placeholder - aquí podrías usar expo-image-picker */}
          <TouchableOpacity className="w-24 h-24 bg-gray-200 rounded-xl items-center justify-center">
            <Text>Añadir</Text>
          </TouchableOpacity>
          {photos.map((p, i) => (
            <Image key={i} source={{ uri: p }} className="w-24 h-24 rounded-xl" />
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={onPublish} className="mt-6 bg-green-600 py-3 rounded-xl">
        <Text className="text-center text-white font-semibold">Publicar reseña</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

import React from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';

export default function CarouselSimple({ images = [] }) {
  const width = Dimensions.get('window').width;
  if (!images.length) {
    return <View className="h-48 bg-gray-100" />;
  }
  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      {images.map((src, idx) => (
        <Image key={idx} source={{ uri: src }} style={{ width, height: 240 }} />
      ))}
    </ScrollView>
  );
}

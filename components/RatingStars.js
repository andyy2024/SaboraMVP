import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function RatingStars({ rating, size = 12 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('full');
    else if (i === full && half) stars.push('half');
    else stars.push('empty');
  }
  return (
    <View className="flex-row items-center">
      {stars.map((s, idx) => (
        <FontAwesome
          key={idx}
          name={s === 'full' ? 'star' : s === 'half' ? 'star-half-o' : 'star-o'}
          size={size}
          style={{ marginRight: 2 }}
        />
      ))}
      <Text className="ml-1 text-sm">{rating.toFixed(1)}</Text>
    </View>
  );
}

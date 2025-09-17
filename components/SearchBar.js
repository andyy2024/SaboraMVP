import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SearchBar({ value, onChange, onFocus }) {
  return (
    <View className="flex-row items-center bg-white rounded-xl px-3 py-2 shadow-sm mx-4 my-2">
      <FontAwesome5 name="search" size={16} style={{ marginRight: 8 }} />
      <TextInput
        className="flex-1 text-base"
        placeholder="Buscar restaurantes, platos..."
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        returnKeyType="search"
      />
      <TouchableOpacity>
        <FontAwesome5 name="sliders-h" size={16} />
      </TouchableOpacity>
    </View>
  );
}

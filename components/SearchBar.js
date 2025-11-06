// SearchBar.js
import React from 'react';
import { View, TextInput } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Props:
 * - value: string
 * - onChangeText?: (text: string) => void
 * - onChange?: (text: string) => void     // fallback if you already used onChange
 * - onFocus?: () => void
 * - placeholder?: string
 * - size?: {
 *     iconSize?: number,   // default 18
 *     fontSize?: number,   // default 16
 *     width?: number|string, // default '100%'
 *     height?: number      // default 48
 *   }
 * - Icon?: React Component // optional, defaults to FontAwesome5 "search" icon
 */
export default function SearchBar({
  value,
  onChangeText,
  onChange,
  onFocus,
  placeholder = '¿Qué quieres hoy?',
  size = {},
  Icon = FontAwesome5,
}) {
  const {
    iconSize = 18,
    fontSize = 16,
    width = '80%',
    height = 60,
  } = size || {};

  return (
    <View style={{ width }}>
      <View
        className="flex-row items-center rounded-full bg-white shadow-md"
        style={{ height }}
      >
        <View className="pl-7 pr-2">
          <Icon name="search" size={iconSize} color="#6B7280" />
        </View>

        <TextInput
          value={value}
          onChangeText={(t) => {
            if (onChangeText) onChangeText(t);
            else if (onChange) onChange(t);
          }}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          className="flex-1 text-gray-900"
          style={{ fontSize }}
          returnKeyType="search"
        />
      </View>
    </View>
  );
}

// SearchView.js
import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Local data (already present in your file)
const restaurants = require('../assets/data/restaurants.json');
const dishes = require('../assets/data/dishes.json');

// Assuming these are colocated; adjust paths if needed
import SearchDishItem from '../components/SearchDishItem';
import SearchRestaurantItem from '../components/SearchRestaurantItem';

const normalize = (s) =>
  (s ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export default function SearchView({ query }) {
  const navigation = useNavigation();
//   const q = normalize(query);
  const q = "gy"

  const dishResults = useMemo(() => {
    if (!q) return [];
    return dishes.filter((d) => normalize(d.name).includes(q));
  }, [q]);

  const restaurantResults = useMemo(() => {
    if (!q) return [];
    return restaurants.filter((r) => normalize(r.name).includes(q));
  }, [q]);

  const onPressDish = useCallback(
    (dish) => {
      Keyboard.dismiss();
      navigation.navigate('Dish', { id: dish.id });
    },
    [navigation]
  );

  const onPressRestaurant = useCallback(
    (restaurant) => {
      Keyboard.dismiss();
      navigation.navigate('Restaurant', { id: restaurant.id });
    },
    [navigation]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingVertical: 12 }}
      >
        {!q ? (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ color: '#6b7280' }}>
              Type to search dishes and restaurants
            </Text>
          </View>
        ) : null}

        {dishResults.length > 0 && (
          <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
            <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 8 }}>
              Dishes
            </Text>
            {dishResults.map((dish) => (
              <SearchDishItem
                key={dish.id}
                dish={dish}
                onPress={() => onPressDish(dish)}
              />
            ))}
          </View>
        )}

        {restaurantResults.length > 0 && (
          <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
            <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 8 }}>
              Restaurants
            </Text>
            {restaurantResults.map((restaurant) => (
              <SearchRestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                onPress={() => onPressRestaurant(restaurant)}
              />
            ))}
          </View>
        )}

        {q && dishResults.length === 0 && restaurantResults.length === 0 && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ color: '#6b7280' }}>No matches found</Text>
          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

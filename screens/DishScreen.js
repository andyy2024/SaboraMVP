// DishScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import RatingStars from '../components/RatingStars';
import IndividualDish from '../components/IndividualDish';
const dishes = require('../assets/data/dishes.json');
const restaurants = require('../assets/data/restaurants.json');
const reviewsData = require('../assets/data/reviews.json');
import { imageMap } from '../assets/imageMap.mjs';

export default function DishScreen({ route }) {
  const { id } = route.params;
  const dish = dishes.find(d => d.id === id);
  if (!dish) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-neutral-800 text-base">No encontrado</Text>
      </View>
    );
  }
  const restaurant = restaurants.find(r => r.id === dish.restaurantId);

  return (
    <View className="flex-1 bg-white">
      <IndividualDish
        dish={dish}
        restaurant={restaurant}
        imageSource={imageMap?.[restaurant.name].dishes[dish.name].main[0]}
        RatingStarsComp={RatingStars}
        reviewsData={reviewsData}
      />
    </View>
  );
}
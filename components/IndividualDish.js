// IndividualDish.js
import React, { useMemo, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable, Dimensions } from 'react-native';

function InitialAvatar({ name }) {
  const initial = typeof name === 'string' && name.length > 0 ? name[0].toUpperCase() : '?';
  return (
    <View className="w-8 h-8 rounded-full bg-purple-200 items-center justify-center">
      <Text className="text-purple-800 font-semibold">{initial}</Text>
    </View>
  );
}

export default function IndividualDish({ dish, restaurant, imageSource, RatingStarsComp, reviewsData = [] }) {
  const width = Dimensions.get('window').width;
  const pagerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const choices = useMemo(() => Array.isArray(dish?.choices) ? dish.choices : [], [dish]);

  const onTabPress = (i) => {
    setIndex(i);
    if (pagerRef.current) {
      pagerRef.current.scrollTo({ x: i * width, animated: true });
    }
  };

  const onMomentumEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (newIndex !== index) setIndex(newIndex);
  };

  const resolveReviews = (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];
    const set = new Set(ids);
    return reviewsData.filter(r => set.has(r.id));
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Foto */}
      <View className="w-full h-56 bg-neutral-100">
        {imageSource ? (
          <Image source={imageSource} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-neutral-500">Sin imagen</Text>
          </View>
        )}
      </View>

      {/* Nombre y restaurante */}
      <View className="px-4 pt-4">
        <Text className="text-2xl font-semibold text-neutral-900">{dish?.name ?? 'Plato'}</Text>
        <Text className="text-neutral-600 mt-1">{restaurant?.name ?? 'Restaurante'}</Text>
      </View>

      {/* Estrellas (rating general del plato) */}
      <View className="px-4 mt-2">
        {typeof dish?.rating === 'number' ? (
          <RatingStarsComp rating={dish.rating} />
        ) : (
          <Text className="text-neutral-500">Sin calificación</Text>
        )}
      </View>

      {/* Variaciones: Tabs header */}
      <View className="mt-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {choices.map((c, i) => {
            const active = i === index;
            return (
              <Pressable
                key={`${c.name}-${i}`}
                onPress={() => onTabPress(i)}
                className={`px-4 py-2 rounded-full border ${
                  active ? 'bg-purple-100 border-purple-400' : 'bg-neutral-100 border-neutral-200'
                }`}
              >
                <Text className={active ? 'text-purple-700 font-medium' : 'text-neutral-700'}>
                  {c.name}{' '}
                  {typeof c.price === 'number' ? `· $${c.price.toLocaleString()}` : ''}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Variaciones: Pager swipeable */}
      <ScrollView
        ref={pagerRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumEnd}
        scrollEventThrottle={16}
        className="mt-3"
      >
        {choices.map((c, i) => {
          const resolved = resolveReviews(c.reviews);
          return (
            <View key={`${c.name}-page-${i}`} style={{ width }} className="px-4">
              {/* Card mejorada */}
              <View
                className="p-5 rounded-2xl bg-white border border-neutral-200"
                style={{
                  shadowColor: '#000',
                  shadowOpacity: 0.08,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 3,
                }}
              >
                {/* Header de la variación */}
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-neutral-900">{c.name}</Text>
                  {typeof c.price === 'number' && (
                    <Text className="text-base font-medium text-neutral-900">
                      ${c.price.toLocaleString()}
                    </Text>
                  )}
                </View>

                {/* Meta */}
                <View className="mt-1 flex-row items-center">
                  {typeof c.rating === 'number' ? (
                    <Text className="text-sm text-neutral-600">Calificación: {c.rating}</Text>
                  ) : (
                    <Text className="text-sm text-neutral-500">Sin calificación</Text>
                  )}
                </View>

                {/* Tags */}
                {Array.isArray(c.tags) && c.tags.length > 0 && (
                  <View className="mt-2 flex-row flex-wrap" style={{ gap: 8 }}>
                    {c.tags.map((t, idx) => (
                      <View
                        key={`${t}-${idx}`}
                        className="px-2 py-1 rounded-full bg-purple-50 border border-purple-200"
                      >
                        <Text className="text-xs text-purple-700">{t}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Descripción */}
                {c.description ? (
                  <Text className="text-neutral-700 mt-3 leading-6">{c.description}</Text>
                ) : null}

                {/* Divider */}
                <View className="h-px bg-neutral-200 my-4" />

                {/* Reseñas */}
                <View>
                  <Text className="text-base font-semibold text-neutral-900">Reseñas</Text>

                  {resolved.length === 0 ? (
                    <Text className="text-neutral-600 mt-2">
                      Oh, parece que todavia no hay reseñas para este plato
                    </Text>
                  ) : (
                    <View className="mt-2" style={{ rowGap: 12 }}>
                      {resolved.map((r) => (
                        <View key={r.id} className="flex-row items-start">
                          <InitialAvatar name={r.user} />
                          <View className="ml-3 flex-1">
                            <View className="flex-row items-center justify-between">
                              <Text className="text-sm font-medium text-neutral-900">{r.user}</Text>
                              <Text className="text-xs text-neutral-500">{r.date}</Text>
                            </View>
                            <View className="mt-1">
                              {/* Si se quiere mostrar estrellas por reseña, se podría reutilizar RatingStarsComp */}
                              <Text className="text-xs text-neutral-600">Rating: {r.rating}</Text>
                            </View>
                            {r.comment ? (
                              <Text className="text-sm text-neutral-700 mt-1">{r.comment}</Text>
                            ) : null}
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
}

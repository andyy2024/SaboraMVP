import React from 'react';
import { View, Text, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// If using Expo: import { BlurView } from 'expo-blur'
import { BlurView } from 'expo-blur'
// import { BlurView } from '@react-native-community/blur';
import SearchBar from '../components/SearchBar';

const HEADER_HEIGHT = 64; // search bar height

export default function ScrollWithStickySearch() {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  // Existing upward lift + animated shadow/elevation
  const barStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 80], [0, -40], Extrapolate.CLAMP);
    const shadowOpacity = interpolate(scrollY.value, [0, 80], [0, 0.25], Extrapolate.CLAMP);
    const shadowRadius = interpolate(scrollY.value, [0, 80], [0, 16], Extrapolate.CLAMP);
    const elevation = interpolate(scrollY.value, [0, 80], [0, 8], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }],
      // iOS shadow
      shadowColor: '#000',
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: 0, height: 8 },
      // Android shadow
      elevation,
    };
  });

  const top = insets.top;

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}

        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          // Push content below the overlayed header area so items scroll under it
          paddingTop: top + HEADER_HEIGHT + 12,
          paddingBottom: 24,
        }}
      >
        {[...Array(30)].map((_, i) => (
          <View
            key={i}
            style={{
              height: 72,
              marginHorizontal: 16,
              marginBottom: 12,
              borderRadius: 12,
              backgroundColor: '#1f2937',
              justifyContent: 'center',
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ color: 'white' }}>Item {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      {/* Blur overlay: items beneath appear blurred as they pass under the bar */}
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: top + HEADER_HEIGHT,
          zIndex: 5,

          // Glass card surface: keep semi-transparent so blur shows through
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.18)',
          // Rounded bottom corners for a "sheet" feel
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: 'hidden',
        }}
        pointerEvents="none"
      />

      {/* Search bar with glassy look and animated lift/shadow */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top,
            left: 12,
            right: 12,
            height: HEADER_HEIGHT,
            zIndex: 10
          },
          barStyle,
        ]}
      >
        <SearchBar />
      </Animated.View>
    </View>
  );
}

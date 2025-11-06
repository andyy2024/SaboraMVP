import React from "react";
import { View, ScrollView, Text } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import SearchBar from "../components/SearchBar"; // your component
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

export default function ScrollWithStickySearch() {
  const scrollY = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const top = insets.top;
  const HEADER_HEIGHT = 64; // search bar height

  const barStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 80],
      [0, -40],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  });

  // New animated style for the BlurView
  const blurStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [-(top + HEADER_HEIGHT), 0], // Starts off-screen and slides in
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <View className="flex-1 bg-purple-100">
      {/* Animated Blur overlay */}
      <Animated.View style={[{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 5,
      }, blurStyle]}>
        <BlurView
          style={{
            height: top + HEADER_HEIGHT,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            overflow: 'hidden',
          }}
          intensity={80}
          tint="light"
        />
      </Animated.View>

      <View style={{ flex: 1, paddingTop: insets.top + 12, paddingBottom: 0 }}>
        <View className="flex-1 bg-transparent">

          {/* Sticky Header Wrapper */}
          <Animated.View className="absolute top-0 left-0 right-0 z-50" style={barStyle}>
            <View className="p-3 flex-1 items-center">
              <SearchBar />
            </View>
          </Animated.View>

          <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingTop: 80 }}
          >
            {[...Array(30)].map((_, i) => (
              <Text key={i} className="p-4 text-lg">
                Item {i + 1}
              </Text>
            ))}
          </Animated.ScrollView>
        </View>
      </View>
    </View>
  );
}

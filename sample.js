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
import { BlurView } from 'expo-blur'

export default function ScrollWithStickySearch() {
    const scrollY = useSharedValue(0);
    const insets = useSafeAreaInsets();

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

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

    const top = insets.top;
    const HEADER_HEIGHT = 64; // search bar height


    return (
        <View className="flex-1 bg-purple-100">
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

            <View style={{ flex: 1, paddingTop: insets.top + 12, paddingBottom: 0 }}>
                <View className="flex-1 bg-transparent">
                    {/* Sticky Header Wrapper */}
                    <Animated.View
                        className="absolute top-0 left-0 right-0 z-50"
                        style={[barStyle]}
                    >

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

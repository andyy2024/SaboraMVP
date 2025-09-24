import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { imageMap } from '../assets/imageMap.mjs';

const restaurants = require('../assets/data/restaurants.json');

export default function MapCard({navigation}) {

  return (
      <MapView
        style={{ flex: 1, marginHorizontal: 12, borderRadius: 12 }}
        initialRegion={{
          latitude: 4.602155855717159,
          longitude: -74.06640679410934,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}

      >

        {restaurants.map((r) => (
          
          <Marker
            key={r.id}
            coordinate={{ latitude: r.coords.lat, longitude: r.coords.lng }}
            onPress={() => {
              navigation.navigate("Restaurant", { id: r.id });
            }}
          >
            <View className="items-center">
              {/* Circle image */}
              <View className="w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-white shadow-md">
                
                <Image
                  source={imageMap[r.name].pin}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Pointer triangle */}
              <View
                className="w-0 h-0 mt-[-2px]"
                style={{
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderTopWidth: 15,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderTopColor: "#E0B0FF",
                }}
              />
            </View>
          </Marker>
        ))}
        
      </MapView>
  );
}

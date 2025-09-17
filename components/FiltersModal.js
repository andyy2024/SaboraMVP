import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Slider } from '@miblanchard/react-native-slider';

const CITY_OPTIONS = ['Bogotá', 'Medellín', 'Cali'];
const TAG_OPTIONS = ['Ramen', 'Sushi', 'Pasta', 'Vegano'];
const SERVICE_OPTIONS = ['Parqueadero', 'Pet friendly', 'WiFi'];

export default function FilterModal({ visible, onClose, onApply, initialFilters }) {
  const insets = useSafeAreaInsets();
  const [city, setCity] = useState(initialFilters.city);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 50000);
  const [tags, setTags] = useState(initialFilters.tags || []);
  const [services, setServices] = useState(initialFilters.services || []);

  const toggle = (arr, v, set) => {
    if (arr.includes(v)) set(arr.filter(x => x !== v));
    else set([...arr, v]);
  };
  

  return (
    
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }}>
        <View style={{ flex: 1, marginTop: insets.top + 60, backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 }}>  
          <Text className="text-lg font-bold">Filtros</Text>

          <View className="mt-4">
            <Text className="font-semibold">Ciudad</Text>
            <View className="flex-row flex-wrap mt-2">
              {CITY_OPTIONS.map(c => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setCity(city === c ? null : c)}
                  className={`px-3 py-2 mr-2 mb-2 rounded-xl ${city === c ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <Text className={`${city === c ? 'text-white' : 'text-black'}`}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mt-4">
            <Text className="font-semibold">Presupuesto máximo: {Math.round(maxPrice)} COP</Text>
            <Slider
              value={maxPrice}
              minimumValue={5000}
              maximumValue={200000}
              step={1000}
              onValueChange={(val) => setMaxPrice(Array.isArray(val) ? val[0] : val)}
            />
          </View>

          <View className="mt-4">
            <Text className="font-semibold">Tipo de comida</Text>
            <View className="flex-row flex-wrap mt-2">
              {TAG_OPTIONS.map(t => (
                <TouchableOpacity
                  key={t}
                  onPress={() => toggle(tags, t, setTags)}
                  className={`px-3 py-2 mr-2 mb-2 rounded-xl ${tags.includes(t) ? 'bg-green-600' : 'bg-gray-200'}`}
                >
                  <Text className={`${tags.includes(t) ? 'text-white' : 'text-black'}`}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mt-4">
            <Text className="font-semibold">Servicios</Text>
            <View className="flex-row flex-wrap mt-2">
              {SERVICE_OPTIONS.map(s => (
                <TouchableOpacity
                  key={s}
                  onPress={() => toggle(services, s, setServices)}
                  className={`px-3 py-2 mr-2 mb-2 rounded-xl ${services.includes(s) ? 'bg-purple-600' : 'bg-gray-200'}`}
                >
                  <Text className={`${services.includes(s) ? 'text-white' : 'text-black'}`}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity onPress={onClose} className="px-4 py-2 rounded-xl bg-gray-200">
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onApply({ city, maxPrice, tags, services })} className="px-4 py-2 rounded-xl bg-blue-600">
              <Text className="text-white">Aplicar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}

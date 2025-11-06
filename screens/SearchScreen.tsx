import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Keyboard, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import FiltersModal from '../components/FiltersModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const restaurantsData = require('../assets/data/restaurants.json');

export default function SearchScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [query, setQuery] = useState('');
  const [quickFilter, setQuickFilter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [results, setResults] = useState(restaurantsData);
  const [filters, setFilters] = useState({
    city: null,
    maxPrice: 50000,
    features: [],
  });

  useEffect(() => {
    if (!query) setResults(restaurantsData);
    else setResults(restaurantsData.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase())));
  }, [query]);

  return (
    <View className='flex-1 bg-purple-100'>

      <View style={{ flex: 1, paddingTop: insets.top + 12, paddingBottom: 0 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 bg-transparent">

          <View className="absolute inset-0 items-center justify-center">
            <SearchBar
              value={query}
              onChangeText={setQuery}
              size={{ width: '80%', height: 70, iconSize: 20, fontSize: 18 }}
            />
          </View>

          <View className="mx-4 mt-2">
            <Text className="text-sm text-gray-500">Filtros rápidos</Text>
            <View className="mt-4 flex-row flex-wrap">
              {['Cerca de mí', 'Mayor rating', 'Menor precio'].map(chip => (
                <TouchableOpacity
                  key={chip}
                  onPress={() => setQuickFilter(chip)}
                  className={`px-3 py-2 mr-2 rounded-full ${quickFilter === chip ? 'bg-green-100' : 'bg-white'}`}
                >
                  <Text>{chip}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setModalOpen(true)}
                className="px-3 py-2 rounded-full bg-white ml-2"
              >
                <Text>Filtros Avanzados</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FiltersModal
            visible={modalOpen}
            initialFilters={filters}
            onClose={() => setModalOpen(false)}
            onApply={(newFilters) => { setFilters(newFilters); setModalOpen(false); }}
          />

        </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

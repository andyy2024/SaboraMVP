import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
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
    <View style={{ flex: 1, paddingTop: insets.top + 12, paddingBottom: 0 }}>

      <View className="flex-1 bg-gray-50">
        <SearchBar value={query} onChange={setQuery} onFocus={() => { }} />
        <View className="mx-4 mt-2">
          <Text className="text-sm text-gray-500">Filtros rápidos</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
          >
            <View className="flex-row">
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
          </ScrollView>
        </View>

        <FlatList
          data={results}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <RestaurantCard item={item} onPress={() => navigation.navigate('Restaurant', { id: item.id })} />}
          contentContainerStyle={{ padding: 16 }}
          numColumns={1}
        />

        <FiltersModal
        visible={modalOpen}
        initialFilters={filters}
        onClose={() => setModalOpen(false)}
        onApply={(newFilters) => { setFilters(newFilters); setModalOpen(false); }}
      />
      </View>
    </View>
  );
}

import { View, Text, ScrollView, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AdjustmentsIcon, SearchIcon } from 'react-native-heroicons/outline';
import SuggestedCard from '../components/SuggestedCard';
import { getAllMenus } from '../services/menu';

const SearchScreen = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getAllMenus();
        setMenus(data);
        setFilteredMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    const filtered = menus.flatMap((restaurant) =>
      restaurant.menu.filter((menuItem) =>
        menuItem.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map((menuItem) => ({
        ...menuItem,
        restaurant_name: restaurant.restaurantName,
      }))
    );
    setFilteredMenus(filtered);
  }, [searchTerm, menus]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="bg-white min-h-screen">
      <SafeAreaView className="pt-16 px-4">
        {/* Heading Search */}
        <View>
          <Text className="font-medium text-left text-3xl">Search</Text>
          {/* Input Search field */}
          <View className="flex-row items-center space-x-2 pb-2 pt-3">
            <View className="flex-row space-x-2 flex-1 bg-gray-200 px-3 py-1 items-center rounded-xl">
              <SearchIcon color="gray" size={25} />
              <TextInput
                style={{ outlineStyle: 'none' }}
                placeholder="Search Restaurant's Menu"
                className="w-[100%] py-3 rounded-sm text-lg font-medium outline-none border-none"
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              <AdjustmentsIcon size={24} color={"#777777"} />
            </View>
          </View>
        </View>

        {/* Suggested Meals */}
        <View className="mt-14">
          <View>
            <Text className="font-bold text-xl text-left">Suggested</Text>
            <View className="border-b border-gray-300/80 mt-2 rounded" />

            <View className="mt-4">
              {filteredMenus.map((menuItem) => (
                <SuggestedCard key={menuItem._id} menuItem={menuItem} />
              ))}
            </View>

            {/* Footer */}
            <View className="flex justify-center items-center mt-32 mb-10">
              <Text className="text-sm text-gray-400 font-medium">That's it!</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SearchScreen;

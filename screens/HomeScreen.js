import { View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Categories from '../components/Categories';
import RecommendedFood from '../components/RecommendedFood';
import BasketIcon from '../components/BasketIcon';
import { useAuth } from '../hooks/useAuth';
import { getAllMenus } from '../services/menu';
import RecommendedCard from '../components/RecommendedCard';
import UserAddress from '../components/UserAddress';
import { getToken, getUser } from '../hooks/useStorage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { loading: authLoading } = useAuth();
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "This is the header",
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = await getToken();
      const storedUser = await getUser();
      setToken(storedToken);
      setUser(storedUser);
      setLoading(false);
    };
    loadStoredData();
  }, []);

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
    if (selectedCategory === 'All') {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.map((restaurant) => ({
        ...restaurant,
        menu: restaurant.menu.filter((menuItem) => menuItem.category === selectedCategory),
      })).filter((restaurant) => restaurant.menu.length > 0);
      setFilteredMenus(filtered);
    }
  }, [selectedCategory, menus]);

  console.log(selectedCategory)
  if (loading || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <BasketIcon />

      <ScrollView className="bg-white min-h-screen">
        <SafeAreaView className="px-4 pt-16">
          <View>
            <UserAddress user={user} />
            <Text className="font-medium text-[47px]">
              Good morning, {user?.name} 👋
            </Text>
            <Text className="text-left text-lg font-medium mt-6">
              Ready to make your first order today?
            </Text>
          </View>
          <View className="border-y border-gray-300/80 my-4 rounded" />

          <View className="mt-5 space-y-8">
            <View>
              <View className="justify-between items-end flex-row">
                <Text className="text-xl font-bold text-left">Categories</Text>
              </View>
              <Categories onCategorySelect={setSelectedCategory} />
            </View>

            <View className="relative mt-8">
              <View className="justify-between items-end flex-row">
                <Text className="text-xl font-bold text-left">All Menus</Text>
              </View>
              <View className="items-center">
                {filteredMenus.map((restaurant) => (
                  <View key={restaurant.restaurantId} className="mt-4">
                    <Text className="text-lg font-bold text-center">{restaurant.restaurantName}</Text>
                    {restaurant.menu.map((menuItem) => (
                      <RecommendedCard
                        key={menuItem._id}
                        id={menuItem._id}
                        name={menuItem.name}
                        description={menuItem.description}
                        avg_person={menuItem.avg_person || "N/A"}
                        delivery={menuItem.isDiscount ? `Discounted Price: Rs${menuItem.discountedPrice}` : 'No Discount'}
                        avg_waiting={menuItem.avg_waiting || "10 - 15"}
                        restaurant_name={restaurant.restaurantName}
                        restaurant_id={restaurant.restaurantId}
                        image={menuItem.image}
                        price={`${menuItem.price}`}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="flex justify-center items-center mt-16 mb-16">
            <Text className="text-sm text-gray-400 font-medium">That's it!</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default HomeScreen;

import { View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import OrderCardResto from '../components/OrderCardResto';
import { getOrdersByRestaurantId } from '../services/order';
import { getToken, getUser } from '../hooks/useStorage';
import { getRestaurantByUserId } from '../services/menu';
import BackButton from '../components/BackButton';

const RestaurantOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);

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
    const fetchRestaurant = async () => {
      try {
        const fetchedRestaurant = await getRestaurantByUserId(user._id);
        setRestaurant(fetchedRestaurant);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    if (user) {
      fetchRestaurant();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      if (restaurant && restaurant._id) {
        const fetchedOrders = await getOrdersByRestaurantId(restaurant._id);
        setOrders(fetchedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurant) {
      fetchOrders();
    }
  }, [restaurant]);

  return (
    <ScrollView className="bg-white min-h-screen">
      <View className="h-[311px] bg-[#d9d9d9]">
        <Text className="text-white text-4xl font-bold text-center pt-10">Orders</Text>

        <View className="m-5 z-50 absolute">
          <BackButton />
        </View>
      </View>
      <SafeAreaView className="pt-16 px-4 pb-20">
        <View>
          <Text className="font-medium text-left text-3xl">Restaurant Orders</Text>
        </View>
        <View className="border-y border-gray-300/80 rounded" />

        <View className="mt-4">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            orders.map((order) => (
              <OrderCardResto
                key={order._id}
                order={order}
                onUpdateSuccess={fetchOrders}
              />
            ))
          )}
        </View>
      </SafeAreaView>
      {/* Footer */}
      <View className="flex flex-col-reverse justify-center items-center mt-32">
        <Text className="text-sm text-gray-400 font-medium">That's it!</Text>
      </View>
    </ScrollView>
  );
}

export default RestaurantOrdersScreen;

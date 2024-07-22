import { View, Text, ScrollView, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';
import { getOrdersByUserId } from '../services/order';
import { getToken, getUser } from '../hooks/useStorage';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

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
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersByUserId(user._id);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user?._id]);

  return (
    <ScrollView className="bg-white min-h-screen">
      <SafeAreaView className="pt-16 px-4 pb-20">
        <View>
          <Text className="font-medium text-left text-3xl">Your Order History</Text>
        </View>
        <View className="border-y border-gray-300/80 rounded"/>

        <View className="mt-4">
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
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

export default OrderScreen;

import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import HomeScreen from '../screens/HomeScreen';
import RestaurantProfile from '../screens/RestaurantProfile';
import FoodScreen from '../screens/FoodScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SigninScreen from '../screens/SigninScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BasketScreen from '../screens/BasketScreen';
import BottomUpPopup from '../components/BottomUpPopup';
import OrderSummary from '../screens/OrderSummary';
import RestaurantOrder from '../screens/RestaurantOrder';
import PreparingPage from '../screens/PreparingPage';
import DeliveryState from '../screens/DeliveryState';
import OrderConfirmed from '../screens/on_delivery_screens/OrderConfirmed';
import DeliveryInProgress from '../screens/on_delivery_screens/DeliveryInProgress';
import CourierOnItsWay from '../screens/on_delivery_screens/CourierOnItsWay';
import DeliverySummary from '../screens/on_delivery_screens/DeliverySummary';
import { useAuth } from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { token, loading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && !token) {
      navigation.navigate('Signin');
    }
  }, [token, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#00000' } }}>
      {/* Homepage */}
      <Stack.Screen
        name="Root"
        component={BottomTab}
        options={{ presentation: 'fullScreenModal', headerShown: false }}
      />
      {/* Food Page */}
      <Stack.Screen
        name="FoodStack"
        component={FoodScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      {/* Restaurant Page */}
      <Stack.Screen
        name="RestaurantStack"
        component={RestaurantProfile}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BottomUpPopup"
        component={BottomUpPopup}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderSummary"
        component={OrderSummary}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="MyRestaurantOrder"
        component={RestaurantOrder}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PreparingPage"
        component={PreparingPage}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliveryState"
        component={DeliveryState}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderConfirmed"
        component={OrderConfirmed}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliveryInProgress"
        component={DeliveryInProgress}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CourierOnItsWay"
        component={CourierOnItsWay}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliverySummary"
        component={DeliverySummary}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const DeliverySummary = ({ route }) => {
  const navigation = useNavigation();
  const { order } = route.params;

  return (
    <View className="bg-black/75 min-h-full">
      <Animatable.View
        animation="slideInUp"
        iterationCount={1}
        className="bg-white h-[355px] w-full absolute bottom-1 rounded-t-3xl px-4 pt-8"
      >
        <Text className="text-3xl font-bold text-left">Delivery Summary</Text>
        <View className="border-y border-gray-300/80 my-4 rounded" />

        <View className="flex flex-row justify-between">
          <Text className="text-lg font-medium text-left">Estimated Delivery Time</Text>
          <Text className="text-lg font-normal">{order.delivery.estimatedTime}</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-lg font-medium text-left">Total Cost</Text>
          <Text className="text-lg font-normal">${order.totalAmount.toFixed(2)}</Text>
        </View>
        <View className="border-y border-gray-300/80 my-4 rounded" />
        <View className="flex flex-row justify-between items-center">
          <Text className="text-xl font-bold text-left">Items delivered</Text>
          <ChevronRightIcon size={20} strokeWidth={4} />
        </View>
        <View className="border-y border-gray-300/80 my-4 rounded" />
        <TouchableOpacity
          onPress={() => navigation.navigate("Root")}
          className="mt-2 rounded-2xl h-[64px] items-center flex flex-row justify-center bg-black"
        >
          <Text className="font-medium text-2xl text-white items-center">Back to the Homepage</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default DeliverySummary;

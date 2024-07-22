import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SuggestedCard = ({ menuItem }) => {
  const navigation = useNavigation();
  const {
    _id,
    name,
    description,
    avg_person,
    delivery,
    avg_waiting,
    restaurant_name,
    image,
    price,
  } = menuItem;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FoodStack', {
          id: _id,
          name,
          description,
          avg_person,
          delivery,
          avg_waiting,
          restaurant_name,
          image,
          price,
        });
      }}
      className="flex-row items-center bg-white p-4 mb-2 rounded-xl shadow-md"
    >
      <Image source={{ uri: image }} className="w-16 h-16 rounded-lg" />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-bold">{name}</Text>
        <Text className="text-gray-500">{restaurant_name}</Text>
        <Text className="text-gray-600">Rs {price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SuggestedCard;

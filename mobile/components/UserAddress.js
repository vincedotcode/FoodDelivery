import { View, Text } from 'react-native';
import React from 'react';
import { LocationMarkerIcon, ChevronDownIcon } from 'react-native-heroicons/outline';

const UserAddress = ({ user }) => {
  return (
    <View className="flex flex-row">
      <LocationMarkerIcon size={20} />
      <View className="relative bottom-5 left-1">
        <Text className="font-bold text-[#686868] text-sm">Delivery To</Text>
        <View className="items-center flex flex-row space-x-1">
          <Text className="font-bold text-base text-left">
            {user?.address || 'No Address Provided'}
          </Text>
          <ChevronDownIcon size={10} strokeWidth={4} />
        </View>
      </View>
    </View>
  );
}

export default UserAddress;

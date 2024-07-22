import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { CurrencyPoundIcon } from 'react-native-heroicons/solid';
import DeliveryInProgress from '../screens/on_delivery_screens/DeliveryInProgress';
import DeliverySummary from '../screens/on_delivery_screens/DeliverySummary';

const OrderCard = ({ order }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const handleViewPress = () => {
    if (order.delivery.status === 'completed') {
      setShowSummary(true);
    } else {
      setShowSummary(false);
    }
    setModalVisible(true);
  };

  return (
    <View>
      <View className="flex flex-row items-center mb-3 mt-2">
        <View className="w-[63px] h-[64px] bg-[#d9d9d9] rounded-md mr-4 flex items-center justify-center">
          <CurrencyPoundIcon size={30} color="#000" />
        </View>
        <View className="mb-5">
          <Text className="text-left font-medium text-lg">{order.orderId}</Text>
          <Text className="text-gray-500 font-medium text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</Text>
        </View>
        
        <TouchableOpacity onPress={handleViewPress} className="absolute right-1 flex items-center justify-center w-[70px] h-[28px] rounded-lg bg-[#c8c8c8]">
          <Text className="text-center font-bold">View</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute right-0 bottom-1 w-[85%] h-7 border-b border-gray-300/80 " />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {showSummary ? (
          <DeliverySummary order={order} onClose={() => setModalVisible(false)} />
        ) : (
          <DeliveryInProgress order={order} onClose={() => setModalVisible(false)} />
        )}
      </Modal>
    </View>
  );
};

export default OrderCard;

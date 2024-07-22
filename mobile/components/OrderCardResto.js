import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { CurrencyPoundIcon } from 'react-native-heroicons/solid';
import { updateDeliveryStepStatus } from '../services/order';
import ModalComponent from '../components/ModalComponent';

const OrderCardResto = ({ order, onUpdateSuccess }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalComponentVisible, setModalComponentVisible] = useState(false);
  const [modalComponentData, setModalComponentData] = useState({});

  const handleViewPress = () => {
    setModalVisible(true);
  };

  const handleUpdateStatus = async (stepId, status) => {
    try {
      const updatedOrder = await updateDeliveryStepStatus(order.orderId, stepId, status);
      setModalComponentData({
        success: true,
        title: 'Success',
        description: `Step status updated to ${status}`,
      });
      onUpdateSuccess();
    } catch (error) {
      console.error('Error updating step status:', error);
      setModalComponentData({
        success: false,
        title: 'Error',
        description: 'Failed to update step status',
      });
    } finally {
      setModalComponentVisible(true);
    }
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
        <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
          <ScrollView className="bg-white w-[90%] p-5 rounded-lg">
            <Text className="font-bold text-xl mb-4">Order Details</Text>
            <Text className="mb-2">Order ID: {order.orderId}</Text>
            <Text className="mb-2">Delivery Address: {order.delivery.address}</Text>
            <Text className="mb-2">Phone Number: {order.delivery.phone_number}</Text>
            <Text className="mb-4">Total Amount: Rs {order.totalAmount}</Text>

            <Text className="font-bold text-lg mb-2">Menu Items</Text>
            {order.items.map((item) => (
              <View key={item._id} className="mb-2">
                <Text className="font-medium">{item.name} x{item.quantity}</Text>
                <Text className="text-gray-500 text-sm">Price: Rs {item.price}</Text>
              </View>
            ))}

            <Text className="font-bold text-lg mb-2">Delivery Steps</Text>
            {order.delivery.steps.map((step) => (
              <View key={step._id} className="mb-2">
                <Text className="font-medium">{step.name}</Text>
                <Text className="text-gray-500 text-sm">Duration: {step.duration} mins</Text>
                <Text className="text-gray-500 text-sm">Status: {step.status}</Text>
                <View className="flex flex-row mt-2">
                  {step.status === 'pending' && (
                    <TouchableOpacity
                      onPress={() => handleUpdateStatus(step._id, 'in_progress')}
                      className="bg-blue-500 p-2 rounded-md mr-2"
                    >
                      <Text className="text-white">In Progress</Text>
                    </TouchableOpacity>
                  )}
                  {step.status === 'in_progress' && (
                    <TouchableOpacity
                      onPress={() => handleUpdateStatus(step._id, 'completed')}
                      className="bg-green-500 p-2 rounded-md"
                    >
                      <Text className="text-white">Complete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-4 bg-red-500 p-2 rounded-md"
            >
              <Text className="text-center text-white">Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <ModalComponent
        visible={modalComponentVisible}
        onClose={() => setModalComponentVisible(false)}
        title={modalComponentData.title}
        description={modalComponentData.description}
        success={modalComponentData.success}
      />
    </View>
  );
};

export default OrderCardResto;

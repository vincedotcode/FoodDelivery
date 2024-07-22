import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CheckList from '../../components/timeline_events/CheckList';

const DeliveryInProgress = ({ route }) => {
  const navigation = useNavigation();
  const { order } = route.params;
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisible(false);
      navigation.navigate('CourierOnItsWay', { order });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, order]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="bg-black/75 flex-1 justify-end">
        <TouchableOpacity className="flex-1" onPress={() => setModalVisible(false)} />
        <View className="bg-white h-[318px] w-full rounded-t-3xl px-4 pt-8">
          <View className="items-center">
            <View className="flex flex-row justify-center space-x-9 items-end">
              <Text className="text-5xl font-bold text-left">{order.delivery.estimatedTime}</Text>
              <Text className="text-base font-medium text-left text-gray-500">
                Estimated time of delivery
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-end space-x-4">
            <Text className="text-lg font-medium text-gray-600 text-left mt-4">
              Live Timeline of Events
            </Text>
            <View className="bg-red-600 rounded-md flex flex-row justify-center h-[26px] w-[58px]">
              <Text className="items-center text-center text-white font-medium text-lg">
                LIVE
              </Text>
            </View>
          </View>
          <View className="border-y border-gray-300/80 my-2 rounded" />
          {order.delivery.steps.map((step, index) => (
            <CheckList
              key={index}
              time={step.time}
              title={step.name}
              description={step.description}
              ready={step.status === 'completed'}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default DeliveryInProgress;

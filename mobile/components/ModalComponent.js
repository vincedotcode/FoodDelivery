import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { HomeIcon, XCircleIcon } from 'react-native-heroicons/outline';

const ModalComponent = ({ visible, onClose, title, description, success }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-lg w-80 p-6">
          <View className="flex items-center">
            {success ? (
              <HomeIcon size={50} color="green" />
            ) : (
              <XCircleIcon size={50} color="red" />
            )}
          </View>
          <Text className="text-center font-bold text-xl mt-4">{title}</Text>
          <Text className="text-center text-gray-600 mt-2">{description}</Text>
          <TouchableOpacity
            className="mt-4 bg-black rounded-lg p-3"
            onPress={onClose}
          >
            <Text className="text-white text-center font-bold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

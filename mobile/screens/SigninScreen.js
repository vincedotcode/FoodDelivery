import { View, Text, TextInput, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { login } from '../services/auth';
import { saveToken, saveUser } from '../hooks/useStorage';
import ModalComponent from '../components/ModalComponent'; // Adjust the path based on your file structure

const SigninScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '', success: true });

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login({ email, password });
      await saveToken(response.token);
      await saveUser(response.user);
      setModalContent({
        title: 'Login Successful',
        description: 'You have been successfully logged in',
        success: true
      });
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Home');
      }, 2000); // Close the modal after 2 seconds
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      setModalContent({
        title: 'Login Failed',
        description: errorMessage,
        success: false
      });
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="bg-white min-h-white">
      <SafeAreaView className="px-4">
        {/* Welcome Page */}
        <View className="mt-32 flex justify-center items-center">
          <Text className="font-medium text-3xl">Welcome Back!👋</Text>
        </View>

        <View className="space-y-4 mt-14">
          <View className="space-y-1">
            <Text className="text-left font-bold text-lg">Email</Text>
            <View className="bg-[#d9d9d9] p-1 rounded-lg">
              <TextInput
                style={{ outlineStyle: 'none' }}
                placeholder="Email"
                className="ml-2 w-[80%] py-3 rounded-sm text-sm font-medium outline-none border-none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>
          <View className="space-y-1">
            <Text className="text-left font-bold text-lg">Password</Text>
            <View className="bg-[#d9d9d9] p-1 rounded-lg">
              <TextInput
                style={{ outlineStyle: 'none' }}
                placeholder="Password"
                secureTextEntry
                className="ml-2 w-[80%] py-3 rounded-sm text-sm font-medium outline-none border-none"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-black items-center rounded-xl p-5 mt-24"
          disabled={loading}
        >
          <Text className="text-white text-lg font-bold">{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        <View className="mt-14">
          <Text className="text-gray-400 font-normal text-sm text-center">
            Don't have an account?
            <Text className="font-medium text-sm text-blue-500 underline" onPress={() => navigation.navigate("Signup")}>
              Sign Up Here
            </Text>
          </Text>
        </View>

        <ModalComponent
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalContent.title}
          description={modalContent.description}
          success={modalContent.success}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default SigninScreen;

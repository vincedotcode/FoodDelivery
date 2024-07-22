import { 
    View, 
    Text,
    ScrollView, 
    TextInput, TouchableOpacity, Image, SafeAreaView 
  } from 'react-native';
  import React, { useState } from 'react';
  import { useNavigation } from '@react-navigation/native';
  import { register } from '../services/auth';
  import ModalComponent from '../components/ModalComponent';
  
  const SignUpScreen = () => {
      const navigation = useNavigation();
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [address, setAddress] = useState('');
      const [role] = useState('customer');
      const [toggleCheckBox, setToggleCheckBox] = useState(false);
      const [loading, setLoading] = useState(false);
      const [modalVisible, setModalVisible] = useState(false);
      const [modalContent, setModalContent] = useState({
        title: '',
        description: '',
        success: true,
      });
  
      const handleSignUp = async () => {
        setLoading(true);
        try {
          const response = await register({
            name,
            email,
            password,
            phone_number: phoneNumber,
            address,
            role,
          });
          setModalContent({
            title: 'Sign Up Successful',
            description: 'You have been successfully signed up',
            success: true,
          });
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.navigate('Signin');
          }, 2000); // Close the modal after 2 seconds
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
          setModalContent({
            title: 'Sign Up Failed',
            description: errorMessage,
            success: false,
          });
          setModalVisible(true);
        } finally {
          setLoading(false);
        }
      };
  
      return (
        <ScrollView className="bg-white min-h-screen">
          <SafeAreaView className="px-4">
            {/* Welcome Page */}
            <View className="mt-32 flex justify-center items-center">
              <Text className="font-medium text-3xl">Welcome to SnackBox</Text>
            </View>
  
            <View className="space-y-4 mt-14">
              <View className="space-y-1">
                <Text className="text-left font-bold text-lg">Full Name</Text>
                <View className="bg-[#d9d9d9] p-1 rounded-lg">
                  <TextInput
                    style={{ outlineStyle: 'none' }}
                    placeholder="Full Name"
                    className="ml-2 w-[80%] py-3 rounded-sm text-sm font-medium outline-none border-none"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
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
              <View className="space-y-1">
                <Text className="text-left font-bold text-lg">Phone Number</Text>
                <View className="bg-[#d9d9d9] p-1 rounded-lg">
                  <TextInput
                    style={{ outlineStyle: 'none' }}
                    placeholder="Phone Number"
                    className="ml-2 w-[80%] py-3 rounded-sm text-sm font-medium outline-none border-none"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>
              <View className="space-y-1">
                <Text className="text-left font-bold text-lg">Address</Text>
                <View className="bg-[#d9d9d9] p-1 rounded-lg">
                  <TextInput
                    style={{ outlineStyle: 'none' }}
                    placeholder="Address"
                    className="ml-2 w-[80%] py-3 rounded-sm text-sm font-medium outline-none border-none"
                    value={address}
                    onChangeText={setAddress}
                  />
                </View>
              </View>
            </View>
  
            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-black items-center rounded-xl p-5 mt-24"
              disabled={loading}
            >
              <Text className="text-white text-lg font-bold">{loading ? 'Signing up...' : 'Sign Up'}</Text>
            </TouchableOpacity>
  
            <View className="mt-14">
              <Text className="text-gray-400 font-normal text-sm text-center">
                Already have an account?
                <Text
                  className="font-medium text-sm text-blue-500 underline"
                  onPress={() => navigation.navigate('Signin')}
                >
                  {' '}
                  Log In Here
                </Text>
              </Text>
  
              <View className="mt-10">
                <Text className="text-gray-600 font-normal text-sm text-center">
                  Are you willing to register as a restaurant? Contact admin please.
                </Text>
              </View>
            </View>
  
            {/* Modal Component */}
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
  
  export default SignUpScreen;
  
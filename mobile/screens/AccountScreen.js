import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronRightIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../hooks/useAuth'; // Ensure the path is correct
import { getToken, getUser } from '../hooks/useStorage';

const AccountScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedToken = await getToken();
      const storedUser = await getUser();
      setToken(storedToken);
      setUser(storedUser);
      setLoading(false);
    };
    loadStoredData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Signin');
  };

  return (
    <ScrollView className="bg-white min-h-screen">
      <SafeAreaView className="pt-16 px-4 pb-[200px]">
        
        {/* Header */}
        <View>
          <Text className="font-medium text-left text-3xl">Account</Text>
          <View className="border-y border-gray-300/80 my-4 rounded" />
        </View>
        {/* User Details */}
        <TouchableOpacity className="flex flex-row items-center">
          <View className="w-[93px] h-[91px] bg-[#d9d9d9] rounded-lg mr-5"></View>
          <View>
            <Text className="font-medium text-lg text-left">{user?.name}</Text>
            <Text className="text-sm font-normal text-left text-gray-400">{user?.phone_number}</Text>
          </View>
          <View className="absolute right-1">
            <ChevronRightIcon height={16} width={10} strokeWidth={4} />
          </View>
        </TouchableOpacity>

        {/* Sections */}
        <View className="border-b border-gray-300/80 pt-3 pb-4">
          <TouchableOpacity>
            <Text className="text-left text-xl font-medium">
              Address
            </Text>
          </TouchableOpacity>
        </View>

        <View className="border-b border-gray-300/80 pt-3 pb-4">
          <TouchableOpacity>
            <Text className="text-left text-xl font-medium">
              Notification
            </Text>
          </TouchableOpacity>
        </View>

        <View className="border-b border-gray-300/80 pt-3 pb-4">
          <TouchableOpacity>
            <Text className="text-left text-xl font-medium">
              Settings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Restaurant Specific Sections */}
        {user?.role === 'restaurant' && (
          <>
            <View className="border-b border-gray-300/80 pt-3 pb-4">
              <TouchableOpacity>
                <Text className="text-left text-xl font-medium">
                  My Restaurant
                </Text>
              </TouchableOpacity>
            </View>

            <View className="border-b border-gray-300/80 pt-3 pb-4">
              <TouchableOpacity>
                <Text className="text-left text-xl font-medium">
                  My Menu
                </Text>
              </TouchableOpacity>
            </View>

            <View className="border-b border-gray-300/80 pt-3 pb-4">
              <TouchableOpacity>
                <Text className="text-left text-xl font-medium">
                  My Restaurant Orders
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity
          onPress={handleLogout}
          className="w-full py-2 rounded-md items-center bg-[#d9d9d9] mt-5">
          <Text className="text-xl font-medium">Log Out</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </ScrollView>
  )
}

export default AccountScreen;

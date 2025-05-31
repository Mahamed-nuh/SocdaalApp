import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'expo-router';
import { LogOut, Bell, Mail, ShieldCheck, FileText, UserCogIcon } from 'lucide-react-native';

export default function SettingsScreen() {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#ff5e5e] rounded-b-3xl px-4 pt-16 pb-6 items-center">
        <Text className="text-white text-xl font-semibold">Settings</Text>
        <View className="w-20 h-20 rounded-full bg-white mt-4 items-center justify-center">
          <Image
            source={require('../../assets/images/user.png')} // Replace with your asset
            className="w-14 h-14"
            resizeMode="contain"
          />
        </View>
        <Text className="text-white mt-2 font-medium">{user?.name || 'Username'}</Text>
        <Text className="text-white text-sm">{user?.email || 'user@example.com'}</Text>
      </View>

      {/* Interactive options */}
      
      <View className="mt-6 px-4 space-y-3">
        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-3">
            <UserCogIcon color="#ff5e5e" />
            <Text className="text-base font-medium text-gray-800">Account Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-3">
            <Bell color="#ff5e5e" />
            <Text className="text-base font-medium text-gray-800">Notifications</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-3">
            <Mail color="#ff5e5e" />
            <Text className="text-base font-medium text-gray-800">Contact Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-3">
            <FileText color="#ff5e5e" />
            <Text className="text-base font-medium text-gray-800">Terms & Conditions</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
          <View className="flex-row items-center space-x-3">
            <ShieldCheck color="#ff5e5e" />
            <Text className="text-base font-medium text-gray-800">Privacy Policy</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Logout button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center justify-center mt-10 mb-10"
      >
        <LogOut size={20} color="red" />
        <Text className="text-red-500 text-base font-semibold ml-2">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

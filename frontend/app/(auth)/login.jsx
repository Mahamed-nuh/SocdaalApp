import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { useUser } from '../../hooks/useUser';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { user, login } = useUser(); // Correctly destructure useUser

  const handleLogin = async () => {
    try {
      await login(email, password); // Call login with email and password
      router.push('/(tabs)/home'); // Navigate to home on successful login
    } catch (error) {
      console.error('Login failed:', error); // Log error for debugging
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center px-6">
          {/* Back Button */}
          <View className="absolute top-6 left-4">
            <Text className="text-xl text-gray-700 text-bold" onPress={() => router.back()}>
              Back
            </Text>
          </View>

          {/* Logo and Welcome Section */}
          <Image
            source={require('../../assets/images/Bus-Booking-Engine.png')}
            className="w-40 h-40 self-center"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-center mt-4">Welcome</Text>
          <Text className="text-sm text-center text-gray-500 mb-6">kusoo dhowoow Socdaal Transportation</Text>

          {/* Input Fields */}
          <TextInput 
            placeholder="email"
            placeholderTextColor="gray"
            className="border px-4 py-2 rounded mb-4 text-black"
            onChangeText={setEmail}
            value={email}
          />

          <TextInput
            placeholder="enter password"
            placeholderTextColor="gray"
            secureTextEntry
            className="border px-4 py-2 rounded mb-4 text-black"
            onChangeText={setPassword}
            value={password}
          />

          {/* Login Button */}
          <TouchableOpacity
            className="bg-orange-400 py-3 rounded-full mb-3"
            onPress={handleLogin} // Use the defined handleLogin function
          >
            <Text className="text-white text-center font-bold">Login</Text>
          </TouchableOpacity>

          {/* Signup Link */}
          <Text className="text-center">
            Don’t have an account?{' '}
            <Text className="text-orange-400" 
              onPress={() => router.push('/(auth)/signup')} animation="false">
              Create here
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

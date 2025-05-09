import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, Keyboard, TouchableNativeFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '../../hooks/useUser';

export default function SignupScreen() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { signup } = useUser();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      await signup(email, password, username); // Ensure signup is implemented correctly
      console.log('Signup successful');
      router.push('/(tabs)/home'); // Navigate to home after successful signup
    } catch (error) {
      console.error('Signup failed:', error); // Log error for debugging
    }
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
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
            className="border px-4 py-2 rounded mb-3"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            placeholder="username"
            placeholderTextColor="gray"
            className="border px-4 py-2 rounded mb-3"
            onChangeText={setUsername}
            value={username}
          />
          <TextInput
            placeholder="enter password"
            placeholderTextColor="gray"
            className="border px-4 py-2 rounded mb-3"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TextInput
            placeholder="re-enter password"
            placeholderTextColor="gray"
            className="border px-4 py-2 rounded mb-5"
            secureTextEntry
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />

          {/* Signup Button */}
          <TouchableOpacity className="bg-orange-400 py-3 rounded-full mb-3" onPress={handleSignup}>
            <Text className="text-white text-center font-bold">Signup</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <Text className="text-center">
            Have an account?{' '}
            <Text className="text-orange-400" onPress={() => router.push('/(auth)/login')}>
              Login here
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableNativeFeedback>
  );
}

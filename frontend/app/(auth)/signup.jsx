import { View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '../../hooks/useUser';  // Custom hook to manage user state

export default function SignupScreen() {
  const router = useRouter();

  // State variables for email, username, and password
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const { signup } = useUser(); // Destructuring user and signup function from the custom hook


  // Function to handle signup
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signup(email, username, password);
      router.push('/(tabs)/home'); // Redirect to login page after successful signup
    } catch (error) {
      console.log(error);
    }
    
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="flex-1 bg-white justify-center px-6">
      {/* Back button in top left corner */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 40, left: 20, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Text className="text-sm text-gray-500">Back</Text>
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/Bus-Booking-Engine.png')}
        className="w-64 h-64 self-center"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-center mt-4">Welcome</Text>
      <Text className="text-sm text-center text-gray-500 mb-6">kusoo dhowoow Socdaal Transportation</Text>

      <TextInput 
      placeholder="email" 
      className="border px-4 py-2 rounded mb-3"
      placeholderTextColor={'grey'}
      keyboardType='email-address'
      onChangeText={setEmail}
      value={email}
      />
      <TextInput 
      placeholder="username" 
      className="border px-4 py-2 rounded mb-3"
      placeholderTextColor={'grey'}
      onChangeText={setUsername}
      value={username}
      />
      <TextInput 
      placeholder="enter password" 
      className="border px-4 py-2 rounded mb-3" 
      secureTextEntry
      placeholderTextColor={'grey'}
      onChangeText={setPassword}
      value={password}
      />
      <TextInput 
      placeholder="re-enter password" 
      className="border px-4 py-2 rounded mb-5" 
      secureTextEntry
      placeholderTextColor={'grey'}
      onChangeText={setConfirmPassword}
      value={confirmPassword}
       />

      <TouchableOpacity onPress={handleSubmit} className="bg-orange-400 py-3 rounded-full mb-3">
        <Text className="text-white text-center font-bold">Signup</Text>
      </TouchableOpacity>

      <Text className="text-center">
        Have an account?{' '}
        <Text className="text-orange-400" onPress={() => router.push('/(auth)/login')}>
          Login here
        </Text>
      </Text>
    </View>
    </TouchableWithoutFeedback>
  );
}

import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-sm mb-1 text-gray-500" onPress={() => router.back()}>Back</Text>
      <Image
        source={require('../../assets/images/Bus-Booking-Engine.png')}
        className="w-64 h-64 self-center"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold text-center mt-4">Welcome</Text>
      <Text className="text-sm text-center text-gray-500 mb-6">kusoo dhowoow Socdaal Transportation</Text>

      <TextInput placeholder="email" className="border px-4 py-2 rounded mb-4" />
      <TextInput placeholder="password" className="border px-4 py-2 rounded mb-6" secureTextEntry />

      <TouchableOpacity className="bg-orange-400 py-3 rounded-full mb-3" onPress={() => router.push('/(tabs)/home')}>
        <Text className="text-white text-center font-bold">Login</Text>
      </TouchableOpacity>

      <Text className="text-center">
        Don’t have an account?{' '}
        <Text className="text-orange-400" onPress={() => router.push('/(auth)/signup')}>
          Create here
        </Text>
      </Text>
    </View>
  );
}

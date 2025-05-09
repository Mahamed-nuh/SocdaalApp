import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FF5C5C] items-center relative">
      <Image
        source={require('../../assets/images/Bus-Booking-Engine.png')}
        className="w-[50%] h-[40%] mt-16"
        resizeMode="contain"
      />

      <TouchableOpacity
        className="bg-orange-400 px-10 py-3 rounded-full absolute bottom-16 w-[80%] self-center"
        onPress={() => router.push('/(auth)/login')}
      >
        <Text className="text-white text-lg font-bold text-center">Start</Text>
      </TouchableOpacity>
    </View>
  );
}

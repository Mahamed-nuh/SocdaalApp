import { useUser } from '@/hooks/useUser';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Settings() {
  const { logout } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24 }}>✅ settings Screen</Text>


          <TouchableOpacity className="bg-orange-400 py-3 rounded-full mb-3" onPress={logout}>
          <Text className="text-white text-center font-bold">Logout</Text>
        </TouchableOpacity>

    </View>

    
  );
}

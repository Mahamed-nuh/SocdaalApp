import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Top Section */}
      <View className="bg-[#FF5E5E] rounded-b-3xl pb-6 pt-12 px-4 items-center">
        <Text className="text-white text-xl font-semibold">Hey BSE!</Text>
        <Text className="text-white text-sm mt-1">Halked Tageysa.</Text>

        {/* Bus icon */}
        <Image
          source={require('../../assets/images/bus.jpg')} // Make sure this path is correct
          className="w-14 h-14 my-4"
          resizeMode="contain"
        />

        {/* Input Section */}
        <View className="bg-[#FFA726] w-full p-4 rounded-2xl space-y-3">
          <View className="relative">
            <TextInput
              placeholder="From"
              className="bg-white rounded-xl px-4 py-3 text-gray-700"
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity className="absolute right-3 top-3 bg-[#FF5E5E] p-1 rounded-full">
              <FontAwesome5 name="exchange-alt" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="To"
            className="bg-white rounded-xl px-4 py-3 text-gray-700"
            placeholderTextColor="#ccc"
          />

          {/* Date Buttons */}
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity className="bg-yellow-300 rounded-full px-4 py-2">
              <Text className="text-sm font-bold">MAANTA</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-300 rounded-full px-4 py-2">
              <Text className="text-sm font-bold">BERRI</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-yellow-300 rounded-full px-4 py-2 flex-row items-center space-x-1">
              <Feather name="calendar" size={16} color="#000" />
              <Text className="text-sm font-bold ml-1">DATE</Text>
            </TouchableOpacity>
          </View>

          {/* Search Button */}
          <TouchableOpacity className="bg-[#FF5E5E] mt-3 rounded-full py-3">
            <Text className="text-white text-center font-semibold">Raadi Bus</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

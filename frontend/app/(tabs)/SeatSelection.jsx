import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft, ArrowLeftRight } from 'lucide-react-native';
import { useRouter } from "expo-router";
import { useLocalSearchParams } from 'expo-router';

// seat colors
const seatColors = {
  driver: 'bg-blue-500',
  available: 'bg-gray-300',
  booked: 'bg-[#FF6B6B]',
  selected: 'bg-[#FFA500]',
  empty: 'bg-gray-200',
};

export default function BusSeatsScreen({ navigation }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const router = useRouter();


    const {
    company,
    busTime,
    price,
    durationTime,
    busDate,
    seats,
    from,
    to
  } = useLocalSearchParams();
console.log(company, busTime, price, durationTime, busDate, seats, from, to);
  
  // Seat data
  const seatRows = [
    ['driver', 'available'],
    ['available', 'available'],
    ['available', 'available'],
    ['available', 'available'],
    ['available', 'available'],

  ];

  const handleSeatPress = (rowIndex, colIndex) => {
    const seatId = `${rowIndex}-${colIndex}`;
    if (seatRows[rowIndex][colIndex] === 'available') {
      setSelectedSeats((prev) =>
        prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
      );
    }
  };

  const handleBooking = () => {
    Alert.alert(
      'Booking Confirmed',
      `You have booked seats: ${selectedSeats.join(', ')}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedSeats([]);
            router.push('PaymentScreen'); // Navigate to payment screen
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="bg-[#FF6B6B] px-4 pb-6">
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl text-center flex-1 font-semibold">
            Dooro Kursigaaga!
          </Text>
        </View>
        <View className="flex-row items-center justify-center space-x-4 mt-4">
          <Text className="text-white text-2xl font-bold"></Text>
          <ArrowLeftRight size={24} color="white" />
          <Text className="text-white text-2xl font-bold">Hargiesa</Text>
        </View>
        <Text className="text-white text-xl text-center mt-2">10-Dec-2023 /Axad</Text>
      </View>

      {/* Travel Info */}
      <View className="mx-4 -mt-2 bg-white rounded-xl shadow-lg p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-semibold text-gray-700">Sahal Travel</Text>
          <Text className="text-2xl font-bold text-[#FFA500]">50,000sh</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-600">6:00 Am - 7:00 Am</Text>
          <Text className="text-gray-600">1h</Text>
        </View>
        <Text className="text-green-500 mt-2">4 qof aya hadhey</Text>
      </View>

      {/* Seat Legend */}
      <View className="flex-row justify-around px-4 mt-6">
        {[
          { color: seatColors.booked, label: 'kiro' },
          { color: seatColors.available, label: 'bannaan' },
          { color: seatColors.selected, label: 'kaaga' },
          { color: seatColors.driver, label: 'Darawal' },
        ].map((item, index) => (
          <View key={index} className="items-center">
            <View className={`w-6 h-6 rounded-md ${item.color}`} />
            <Text className="text-gray-600 mt-1">{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Seats Grid */}
      <ScrollView className="flex-1 px-4 mt-6">
        {seatRows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row gap-4 justify-center">
            {row.map((status, colIndex) => (
              <TouchableOpacity
                key={`${rowIndex}-${colIndex}`}
                onPress={() => handleSeatPress(rowIndex, colIndex)}
                disabled={status === 'empty' || status === 'booked' || status === 'driver'}
                className={`w-14 h-14 rounded-xl ${
                  selectedSeats.includes(`${rowIndex}-${colIndex}`)
                    ? seatColors.selected
                    : seatColors[status]
                }`}
              >
                {status !== 'empty' && (
                  <Text className="text-center text-white font-bold mt-4">
                    {status === 'driver' ? 'D' : `${rowIndex * 2 + colIndex}`}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Booking Button */}
      <View className="px-4 py-4">
        <TouchableOpacity
          onPress={handleBooking}
          disabled={selectedSeats.length === 0}
          className={`w-full py-4 rounded-xl ${
            selectedSeats.length > 0 ? 'bg-[#FFA500]' : 'bg-gray-300'
          }`}
        >
          <Text className="text-white text-center text-xl font-bold">
            {selectedSeats.length > 0 ? 'Confirm Booking' : 'Select Seats'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

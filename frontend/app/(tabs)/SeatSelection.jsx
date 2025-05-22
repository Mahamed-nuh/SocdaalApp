import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft, ArrowLeftRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getBookedSeats } from '../../lib/seatapi'; 
import { useUser } from '../../hooks/useUser';
import { useBooking } from '../../hooks/useBooking'; // <-- import your booking hook

const seatColors = {
  driver: 'bg-blue-500',
  available: 'bg-gray-300',
  booked: 'bg-[#FF6B6B]',
  selected: 'bg-[#FFA500]',
  empty: 'bg-gray-200',
};

export default function SeatSelectionScreen({ navigation }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeatIds, setBookedSeatIds] = useState([]);
  const router = useRouter();
  const { user } = useUser();
  const { createBooking, getBookedSeats } = useBooking(); // <-- use the booking hook here

  const {
    company,
    busTime,
    price,
    durationTime,
    busDate,
    seats,
    from,
    to,
  } = useLocalSearchParams();

  // You can generate seats dynamically or hardcode for now
  const seatRows = [
    ['driver', 'available'],
    ['available', 'available'],
    ['available', 'available'],
    ['available', 'available'],
    ['available', 'available'],
  ];

  // Fetch booked seats on mount
    useEffect(() => {
      const fetchBooked = async () => {
        if (!from || !to || !busDate || !busTime || !company) {
          console.error("Missing trip parameters", { from, to, busDate, busTime, company });
          return;
        }

        const booked = await getBookedSeats(from, to, busDate, busTime, company);
        setBookedSeatIds(booked);
      };

      fetchBooked();
    }, []);



const handleSeatPress = (rowIndex, colIndex) => {
  const seatsPerRow = 2;
  const seatId = String(rowIndex * seatsPerRow + colIndex + 1); // consistent with seat number
  const status = getSeatStatus(seatId, seatRows[rowIndex][colIndex]);

  if (status === 'available' || status === 'selected') {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId) // unselect
        : [...prev, seatId] // select
    );
  }
};


  const getSeatStatus = (seatId, original) => {
    if (original === 'driver') return 'driver';
    if (bookedSeatIds.includes(seatId)) return 'booked'; // 🔥 This line works now!
    if (selectedSeats.includes(seatId)) return 'selected';
    return original;
  };




const handleBooking = async () => {
  let allSuccess = true;

  // Loop over all selected seats and book them
  for (const seatId of selectedSeats) {
    const success = await createBooking({
      from,
      to,
      busdate: busDate,
      bustime: busTime,
      company,
      seatId,
      userId: user?.$id,
      userName: user?.name,
      price, // price per seat
    });

    if (!success) {
      allSuccess = false;
      break; // stop if any booking fails
    }
  }

  if (allSuccess) {
    const totalPrice = parseInt(price) * selectedSeats.length;


    Alert.alert(
      "Booking Successful",
      `You booked seat: ${selectedSeats.join(', ')}\nTotal Price: ${totalPrice.toLocaleString()}`
    );

    setSelectedSeats([]);
    router.push('/PaymentScreen', {
      params: {
        from,
        to,
        busDate,
        busTime,
        company,
        seats: selectedSeats.join(', '),
        totalPrice,
      },
    });
  } else {
    Alert.alert("Booking Failed", "Please try again.");
  }
};


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-[#FF5A5A] px-4 pb-6">
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-2xl text-center flex-1 font-semibold">
            Dooro Kursigaaga!
          </Text>
        </View>
        <View className="flex-row items-center justify-center space-x-4 mt-4">
          <Text className="text-white text-2xl font-bold">{from}</Text>
          <ArrowLeftRight size={24} color="white" />
          <Text className="text-white text-2xl font-bold">{to}</Text>
        </View>
        <Text className="text-white text-xl text-center mt-2">{busDate}</Text>
      </View>

      <View className="mx-4 -mt-2 bg-white rounded-xl shadow-lg p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-semibold text-gray-700">{company}</Text>
          <Text className="text-2xl font-bold text-[#FFA500]">{price}</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-600">{busTime}</Text>
          <Text className="text-gray-600">{durationTime}h</Text>
        </View>
        <Text className="text-green-500 mt-2">{seats} qof aya hadhey</Text>
      </View>

      {/* Seat Legend */}
      <View className="flex-row justify-around px-4 mt-6">
        {[{ color: seatColors.booked, label: 'kiro' },
          { color: seatColors.available, label: 'bannaan' },
          { color: seatColors.selected, label: 'kaaga' },
          { color: seatColors.driver, label: 'Darawal' }].map((item, index) => (
          <View key={index} className="items-center">
            <View className={`w-6 h-6 rounded-md ${item.color}`} />
            <Text className="text-gray-600 mt-1">{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Seats */}
      <ScrollView className="flex-1 px-4 mt-6">
        {seatRows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row gap-4 justify-center pt-2">
            {row.map((original, colIndex) => {
            const seatsPerRow = 2;
            const seatId = String(rowIndex * seatsPerRow + colIndex + 1);
            const status = getSeatStatus(seatId, original);

            return (
              <TouchableOpacity
                key={seatId}
                onPress={() => handleSeatPress(rowIndex, colIndex)}
                disabled={status === 'booked' || status === 'driver'}
                className={`w-14 h-14 rounded-xl ${seatColors[status]} justify-center items-center`}
              >
                <Text className="text-white font-bold">
                  {original === 'driver' ? 'D' : seatId}
                </Text>
              </TouchableOpacity>
            );
          })}

          </View>
        ))}
      </ScrollView>

      <View className="px-4 py-4">
        <TouchableOpacity
          onPress={handleBooking}
          disabled={selectedSeats.length === 0}
          className={`w-full py-4 rounded-xl ${
            selectedSeats.length > 0 ? 'bg-[#FF8C42]' : 'bg-gray-300'
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

import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Pressable, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router"; 
import { getBuses } from "../../lib/busApi" // make sure the path is correct

export default function BusSelectionScreen() {
  const { from, to, date } = useLocalSearchParams();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState("");
  const [busTime, setBusTime] = useState("");
  const [price, setPrice] = useState("");
  const [durationTime, setDurationTime] = useState("");
  const [busDate, setBusDate] = useState("");
  const [seats, setSeats] = useState("");


  useEffect(() => {
    const fetchFilteredBuses = async () => {
      setLoading(true);
      const results = await getBuses(from, to, date);
      setBuses(results);
      setLoading(false);
    };

    fetchFilteredBuses();
  }, [from, to, date]);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#FF5A5A] py-8 px-4 rounded-b-3xl">
        <Text className="text-white text-center text-xl font-bold">Dooro bus</Text>
        <Text className="text-white text-center text-lg italic mt-2">
          {from} ↔ {to}
        </Text>
        <Text className="text-white text-center">{date}</Text>

        <Image
          source={require('../../assets/images/bus.png')}
          className="w-32 h-32 self-center mt-0"
          resizeMode="contain"
        />
      </View>

      {/* Bus List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF5A5A" />
          <Text className="mt-4 text-gray-500">Baaraya basaska...</Text>
        </View>
      ) : buses.length === 0 ? (
        <Text className="text-center mt-4 text-gray-600">
          Ma jiraan basas u socda {to} taariikhda {date}.
        </Text>
      ) : (
        <FlatList
          data={buses}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Pressable onPress={() => {
            const query = `company=${encodeURIComponent(item.company)}&busTime=${item.busTime}&price=${item.price}&durationTime=${item.durationTime}&busDate=${item.date}&seats=${item.seats}&from=${from}&to=${to}`;
            router.push('/SeatSelection?' + query);
            
            }}>


              <View className="bg-white p-4 mb-4 rounded-lg shadow">
                <Text className="text-lg font-bold">{item.company}</Text>
                <Text className="text-gray-600">Time: {item.busTime}</Text>
                <Text className="text-gray-600">Price: {item.price}</Text>
                <Text className="text-gray-600">Duration: {item.durationTime}</Text>
                <Text className="text-gray-600">Date: {item.date}</Text>
                <Text className="text-gray-600">Seats: {item.seats}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, Pressable, ActivityIndicator, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router"; 
import { ArrowLeftRight } from "lucide-react-native";
import { getBuses } from "../../lib/busApi";

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
      try {
        const results = await getBuses(from, to, date);
        setBuses(results);
      } catch (e) {
        console.error("Failed to fetch buses:", e);
        setBuses([]); // fallback to empty array
      }
      setLoading(false);
    };

    fetchFilteredBuses();
  }, [from, to, date]);

  return (
    <View className="flex-1 bg-white">
      <View className="bg-[#FF5A5A] py-8 px-4 rounded-b-3xl">
        <View className="flex-row items-center justify-between mt-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2"
          >
            {/* Fix: wrap the arrow in a Text component only */}
            <Text className="text-5xl text-white">{'‹'}</Text>
          </TouchableOpacity>
          <Text className="text-white text-xl text-center flex-1 font-bold">
            Dooro bus
          </Text>
          {/* Fix: use an empty View for spacing, not a comment */}
          <View style={{ width: 40 }} />
        </View>
        <Text className="text-white text-center text-lg italic mt-2">
          {from} 
                    <ArrowLeftRight size={20} color="white" />
          {to}
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


              <View className="mx-4 -mt-2 bg-white rounded-xl shadow-lg p-4 pt-6 mb-8 ">
                      <View className="flex-row justify-between items-center">
                        <Text className="text-2xl font-semibold text-gray-700">{item.company} </Text>
                        <Text className="text-2xl font-bold text-[#FFA500]">{item.price}</Text>
                      </View>
                      <View className="flex-row justify-between mt-2">
                        <Text className="text-gray-600">{item.busTime}</Text>
                        <Text className="text-gray-600">{item.durationTime}</Text>
                      </View>
                      {/* Changed seats text to default "10 Kursi" */}
                      <Text className="text-green-500 mt-2">10 Kursi</Text>
                    </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

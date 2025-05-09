import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform, Modal, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ArrowUpDown, Calendar } from "lucide-react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [fromCity, setFromCity] = useState("Hargeisa");
  const [toCity, setToCity] = useState("Borama");

  const cities = [
    "Hargeisa", "Borama", "Berbera", "Burao", "Las Anod",
    "Jigjiga", "Gebiley", "Ceel Afweyn", "Lughaya", "Oodweyne",
    "Sheikh", "Wajaale", "Zeylac"
  ];

  const onDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const CitySelectionModal = ({ visible, onClose, onSelect }) => (
    <Modal transparent visible={visible} animationType="slide">
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: "rgba(255, 107, 107, 0.8)" }}>
        <View className="bg-white w-11/12 rounded-lg p-4">
          <Text className="text-lg font-bold mb-4">Select City</Text>
          <FlatList
            data={cities}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 border-b border-gray-200"
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text className="text-gray-800">{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity className="mt-4 bg-red-500 py-2 rounded" onPress={onClose}>
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar translucent style="light" />

      {/* Header */}
      <View className="bg-[#FF6B6B] pt-12 pb-4 px-4 rounded-b-3xl">
        <Text className="text-white text-3xl font-bold">!</Text>
        <Text className="text-white text-2xl">Halked Tageysa.</Text>
        {/* <Image
          source={require("../assets/images/images_bus.png")}
          className="w-24 h-12 self-center mt-2"
          resizeMode="contain"
        /> */}
      </View>

      {/* Main Content */}
      <View className="flex-1 mx-4 -mt-6">
        <View className="bg-[#FFA45B] p-6 rounded-3xl">
          {/* From City */}
          <TouchableOpacity
            className="bg-white rounded-lg mb-4 p-4"
            onPress={() => setShowFromModal(true)}
          >
            <Text className="text-gray-600">{fromCity || "Select From City"}</Text>
          </TouchableOpacity>

          {/* Swap Button */}
          <TouchableOpacity
            className="absolute right-8 top-16 z-10 bg-[#FF6B6B] p-2 rounded-full"
            onPress={() => {
              const temp = fromCity;
              setFromCity(toCity);
              setToCity(temp);
            }}
          >
            <ArrowUpDown size={20} color="white" />
          </TouchableOpacity>

          {/* To City */}
          <TouchableOpacity
            className="bg-white rounded-lg mb-6 p-4"
            onPress={() => setShowToModal(true)}
          >
            <Text className="text-gray-600">{toCity || "Select To City"}</Text>
          </TouchableOpacity>

          {/* Date Buttons */}
          <View className="flex-row justify-between mb-6">
            <TouchableOpacity
              className="bg-[#FF8C42] px-6 py-3 rounded-full"
              onPress={() => setDate(new Date())}
            >
              <Text className="text-white font-semibold">MAANTA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#FF8C42] px-6 py-3 rounded-full"
              onPress={() => setDate(new Date(Date.now() + 24 * 60 * 60 * 1000))}
            >
              <Text className="text-white font-semibold">BERRI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#FF8C42] px-6 py-3 rounded-full flex-row items-center"
              onPress={() => setShowPicker(true)}
            >
              <Calendar size={18} color="white" className="mr-1" />
              <Text className="text-white font-semibold">{formattedDate}</Text>
            </TouchableOpacity>
          </View>

          {/* Show Date Picker */}
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={onDateChange}
            />
          )}

          {/* Search Button */}
          <TouchableOpacity
            className="bg-[#FF6B6B] py-4 rounded-full"
            onPress={() =>
              router.push(`BusSelectionScreen?from=${fromCity}&to=${toCity}&date=${formattedDate}`)
            }
          >
            <Text className="text-white text-center text-lg font-bold">
              Raadi Bus
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <CitySelectionModal
        visible={showFromModal}
        onClose={() => setShowFromModal(false)}
        onSelect={setFromCity}
      />
      <CitySelectionModal
        visible={showToModal}
        onClose={() => setShowToModal(false)}
        onSelect={setToCity}
      />
    </View>
  );
}

import { useTickets } from '@/hooks/useTickets';
import { useRouter } from 'expo-router';
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'

const Test = () => {
  const [company, setCompany] = useState('');
  const [busTime, setBusTime] = useState('');
  const [price, setPrice] = useState('');
  const [durationTime, setDurationTime] = useState('');
  const [busDate, setBusDate] = useState('');
  const [loading, setLoading] = useState(false);

  const { createTicket } = useTickets(); 
  const router = useRouter();
  
  const handleSubmit = async () => {
    if(!company.trim() || !busTime.trim() || !price.trim() || !durationTime.trim() || !busDate.trim()) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);

    try {
          await createTicket({
          company,
          busTime,
          price,
          durationTime,
          busDate
        });

        // Reset the form
        setCompany('');
        setBusTime('');
        setPrice('');
        setDurationTime('');
        setBusDate('');

        router.replace('/(tabs)/tickets');

        alert("Ticket created successfully");

        setLoading(false);

    } catch (error) {
        console.error(error);
        alert("Error creating ticket");
        setLoading(false);
    }
    

  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-8">
      <View className="bg-gray-100 p-6 rounded-2xl shadow">
        <Text className="text-2xl font-bold mb-4 text-gray-800">Bus Info</Text>
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-gray-800"
          placeholder="Company"
          placeholderTextColor={'grey'}
          value={company}
          onChangeText={setCompany}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-gray-800"
          placeholder="Bus Time"
          placeholderTextColor={'grey'}
          value={busTime}
          onChangeText={setBusTime}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-gray-800"
          placeholder="Price"
          placeholderTextColor={'grey'}
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-gray-800"
          placeholder="Duration Time"
          placeholderTextColor={'grey'}
          value={durationTime}
          onChangeText={setDurationTime}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-4 py-3 mb-4 text-base text-gray-800"
          placeholder="Bus Date"
          placeholderTextColor={'grey'}
          value={busDate}
          onChangeText={setBusDate}
        />
        {/* Fix: Ensure the button is inside the View and not overlapped by keyboard */}
        <TouchableOpacity
          className="bg-[#FF6B6B] py-4 rounded-full"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-center text-lg font-semibold">
            {loading ? "saving..." : "create Ticket"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Test
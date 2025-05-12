import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/hooks/useUser";

const _layout = () => {
  const { user } = useUser();
  // Check if user is logged in
  console.log(user);

  return (
    <Tabs >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
        <Tabs.Screen
        name="tickets"
        options={{
          tabBarLabel: "Tickets",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />

    </Tabs>
  );
};

export default _layout;


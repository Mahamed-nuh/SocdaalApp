import { Stack } from 'expo-router';

export default function ScreensLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,             // Show header with back button
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
  );
}

import GuestOnly from '@/components/auth/GuestOnly';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <GuestOnly>
    <Stack
      screenOptions={{
        headerShown: false, // Hide default header for a clean auth UI
      }}
    />
    </GuestOnly>
  );
}

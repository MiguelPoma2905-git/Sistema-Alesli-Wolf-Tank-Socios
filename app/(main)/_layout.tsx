import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="suppliers" />
      <Stack.Screen name="scanner" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}

import { Stack } from "expo-router";

export default function Stacklayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="info" options={{ headerShown: false }} />
      <Stack.Screen name="Search" options={{ headerShown: false }} />
      <Stack.Screen name="Notification" options={{ headerShown: false }} />
    </Stack>
  );
}

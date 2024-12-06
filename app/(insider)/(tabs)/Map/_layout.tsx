import React from "react";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="Profile" options={{ headerShown: false }} />
    </Stack>
  );
}

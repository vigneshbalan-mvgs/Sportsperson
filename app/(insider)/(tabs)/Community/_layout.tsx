import React from "react";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="createTeam" options={{ headerShown: false }} />
      <Stack.Screen name="editTeam" options={{ headerShown: false }} />
      <Stack.Screen name="createEvent" options={{ headerShown: false }} />
      <Stack.Screen name="checkPlayers" options={{ headerShown: false }} />
      <Stack.Screen name="request" options={{ headerShown: false }} />
    </Stack>
  );
}
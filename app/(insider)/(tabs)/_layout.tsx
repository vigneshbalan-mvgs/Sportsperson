import React from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";
import { Tabs } from "expo-router";
import TabBar from "@components/TabBar";

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Community" />
      <Tabs.Screen name="Add" />
      <Tabs.Screen name="Map" />
      <Tabs.Screen name="Messages" />
    </Tabs>
  );
}

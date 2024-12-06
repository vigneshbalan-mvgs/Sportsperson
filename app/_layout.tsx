import { Stack } from "expo-router";

import "react-native-gesture-handler";
import "react-native-reanimated";

import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="getstarted"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: true,
          presentation: "modal",
          animation: "ios",
          statusBarHidden: true,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="forgot"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="otpverfication"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
      <Stack.Screen
        name="(insider)"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "#333",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
          headerTransparent: false,
          presentation: "modal",
          animation: "ios",
          statusBarStyle: "dark",
          statusBarColor: "transparent",
        }}
      />
    </Stack>
  );
}

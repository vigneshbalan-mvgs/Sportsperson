import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileOthers" options={{ headerShown: false }} />
      <Stack.Screen name="PersonalDetails" options={{ headerShown: false }} />
      <Stack.Screen name="PersonalEdit" options={{ headerShown: false }} />
      <Stack.Screen
        name="TermsAndConditions"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Sports" options={{ headerShown: false }} />
      <Stack.Screen name="Athletics" options={{ headerShown: false }} />
      <Stack.Screen name="Notification" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;

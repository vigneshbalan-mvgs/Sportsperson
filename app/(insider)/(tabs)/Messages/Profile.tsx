import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

// components
import Button from "@components/Button";

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleLogout = () => {
    showToast();
    setLoading(true); // Show loading spinner
    setTimeout(() => {
      auth().signOut();
      Toast.show({
        type: "success",
        position: "top",
        text1: "Logged Out Successfully",
        text2: "You have been logged out.",
        visibilityTime: 1500,
        autoHide: true,
      });
      router.replace("/login");
      setLoading(false); // Hide loading spinner after logout
    }, 700); // Set timer (e.g., 2 seconds delay before logging out)
  };
  const showToast = () => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Success!",
      text2: "Your action was completed successfully.",
      visibilityTime: 3000,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <Text>Welcome {user ? user.displayName : "Guest"}</Text>
      <Text>Email: {user ? user.email : ""}</Text>
      <Text>Phone Number: {user ? user.phoneNumber : ""}</Text>
      <Text></Text>
      <Button title="Logout" type="primary" onPress={handleLogout} />
      <Text></Text>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;

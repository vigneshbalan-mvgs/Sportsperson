import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";

import { colors } from "../const/colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0); // Progress state
  const [user, setUser] = useState(null); // Current user state

  const delayTime = 10; // Initial delay (ms)
  const progressSpeed = 80; // Progress increment interval (ms)
  const progressIncrement = 0.05; // Increment value
  //
  // const delayTime = 0; // Initial delay (ms)
  // const progressSpeed = 100; // Progress increment interval (ms)
  // const progressIncrement = 10; // Increment value

  // Function to manage progress
  const startProgress = () => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1; // Ensure progress doesn't exceed 1
          }
          return prev + progressIncrement;
        });
      }, progressSpeed);
    }, delayTime);
  };

  useFocusEffect(
    React.useCallback(() => {
      const subscriber = auth().onAuthStateChanged((currentUser) => {
        if (__DEV__)
          console.log(currentUser ? "User logged in" : "User not logged in");
        setUser(currentUser);
        startProgress(); // Start the progress after determining user
      });
      return () => subscriber(); // Cleanup on unmount
    }, []),
  );

  // Handle navigation when progress completes
  useEffect(() => {
    if (progress >= 1) {
      if (user) {
        router.replace("/(insider)/(tabs)/Home/"); // Navigate to Home
      } else {
        router.replace("/getstarted"); // Navigate to getstarted
      }
    }
  }, [progress, user, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sportsperson</Text>
      <Progress.Bar
        progress={progress}
        width={wp(80)}
        height={10}
        borderRadius={5}
        color={colors.primary}
        unfilledColor="#e0e0e0"
        borderWidth={0}
        animated={progress < 1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

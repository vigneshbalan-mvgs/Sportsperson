import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { PORT } from "const/PORT";
import { saveImage, getToken } from "@/hooks/userDetails";

import { colors } from "../const/colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

async function getSecureStoreItem(key: any) {
  try {
    const result = await SecureStore.getItemAsync(key);
    const token = await getToken();
    const response = await fetch(`${PORT}/api/user/myprofile`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    const data = await response.json();  // Await the response.json()
    console.log(data);
    saveImage(data.info.profile);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error("Error reading secure store:", error);
    return null;
  }
}

export default function SplashScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);

  const delayTime = 10;
  const progressSpeed = 80;
  const progressIncrement = 0.05;

  const startProgress = () => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1;
          }
          return prev + progressIncrement;
        });
      }, progressSpeed);
    }, delayTime);
  };

  useFocusEffect(
    React.useCallback(() => {
      const subscriber = auth().onAuthStateChanged(async (currentUser) => {
        const isLoggedIn = await getSecureStoreItem("isLoggedIn");
        setUser(currentUser || isLoggedIn);
        startProgress();
      });
      return () => {
        subscriber();
      };
    }, [])
  );

  useEffect(() => {
    console.log(PORT);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      if (user) {
        router.replace("/(insider)/(tabs)/Home/");
      } else {
        router.replace("/getstarted");
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


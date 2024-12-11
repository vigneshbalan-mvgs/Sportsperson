import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import { router } from "expo-router";
import { colors } from "../const/colors";
import { Feather } from "@expo/vector-icons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import PasswordInput from "./Input";

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
});

const Topbar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [count, setCount] = useState(true);

  const dotAnimValues = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ];

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Login in progress");
      } else {
        console.log(error);
      }
    }
  };
  // Handle click on Notification
  const handleNotificationClick = () => {
    setCount(!count);
    router.push("/Notification/");
  };

  const profileImage = userInfo?.photoURL
    ? { uri: userInfo.photoURL }
    : require("../assets/images/Banner.png");

  return (
    <View style={styles.Topbar}>
      <View>
        <Image
          source={require("../assets/images/Logo.png")}
          style={{ width: 50, resizeMode: "contain" }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 15 }}>
        {/* Info Button */}
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            router.push("/info/");
          }}
        >
          <Feather
            name="info"
            size={24}
            color={colors.secondaryMediumOpacity}
          />
        </TouchableOpacity>

        {/* Search/Other Feature */}
        <TouchableOpacity style={{ justifyContent: "center" }}>
          <Image source={require("../assets/icons/binocular.png")} />
        </TouchableOpacity>

        {/* Notification with animated dots */}
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={handleNotificationClick}
        >
          <View>
            <Image source={require("../assets/icons/whistle.png")} />
            {!count === false && (
              <View style={styles.dotContainer}>
                <View style={styles.notificationDot1}></View>
                <View style={styles.notificationDot2}></View>
                <View style={styles.notificationDot3}></View>
                <View style={styles.notificationDot4}></View>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={() => router.push("/profile/")}
        >
          <Image
            source={profileImage}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  Topbar: {
    top: 0,
    width: wp(100),
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -10,
    right: 0,
  },
  notificationDot1: {
    transform: [{ rotate: "150deg" }],
    backgroundColor: "red",
    width: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  notificationDot2: {
    transform: [{ rotate: "170deg" }],
    backgroundColor: "red",
    width: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  notificationDot3: {
    transform: [{ rotate: "190deg" }],
    backgroundColor: "red",
    width: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  notificationDot4: {
    transform: [{ rotate: "210deg" }],
    backgroundColor: "red",
    width: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});

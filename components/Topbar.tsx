import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native";
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
  webClientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com", // Use your actual client ID from Firebase
});

const Topbar = () => {
  const [userInfo, setUserInfo] = useState(null);

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

  // Use the user's profile picture if available, else use a default image
  const profileImage = userInfo?.photoURL
    ? { uri: userInfo.photoURL } // Remote user profile image
    : require("../assets/images/Banner.png"); // Default fallback image

  return (
    <View style={styles.Topbar}>
      <View>
        <Image
          source={require("../assets/images/Logo.png")}
          style={{ width: 50, resizeMode: "contain" }}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 15 }}>
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
        <TouchableOpacity style={{ justifyContent: "center" }}>
          <Image source={require("../assets/icons/binocular.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: "center" }}>
          <Image source={require("../assets/icons/whistle.png")} />
        </TouchableOpacity>
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
});

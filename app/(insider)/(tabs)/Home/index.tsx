import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import BottomSheet from "@gorhom/bottom-sheet";

// components
import Button from "@components/Button";
import Topbar from "@components/Topbar";
import Post from "@components/Posts/Post";
import PostMain from "@components/Posts/PostMain";
import { ScreenStackHeaderSubview } from "react-native-screens";
import PasswordInput from "@components/Input";

function Home() {
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

  // const handleLogout = () => {
  //   setLoading(true); // Show loading spinner
  //   setTimeout(() => {
  //     auth().signOut();
  //     Toast.show({
  //       type: "success",
  //       position: "top",
  //       text1: "Logged Out Successfully",
  //       text2: "You have been logged out.",
  //       visibilityTime: 3000,
  //       autoHide: true,
  //     });
  //     router.replace("/login");
  //     setLoading(false); // Hide loading spinner after logout
  //   }, 2000); // Set timer (e.g., 2 seconds delay before logging out)
  // };
  const showToast = () => {
    Toast.show({
      type: "error",
      position: "top",
      text1: "Success!",
      text2: "Your action was completed successfully.",
      visibilityTime: 3000,
      onPress: () => {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Success!",
          text2: "Your action was completed successfully.",
        });
      },
      onHide: () => {
        console.log("Toast was hidden!");
      },
    });
  };

  return (
    <View style={styles.container}>
      <Topbar />
      <PostMain />
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

export default Home;

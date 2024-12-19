import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import Topbar from "@components/Topbar";
import PostMain from "@components/Posts/PostMain";

function Home() {
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

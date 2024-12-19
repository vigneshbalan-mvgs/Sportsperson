import { ScrollView, Text, View } from "react-native";
import React from "react";
import Profile from "@components/Profile/Profile";
import BackButton from "@components/back";
import Drawer from "@components/Drawer";

const index = () => {
  return (
    <View style={{ flex: 1 }}>
      <BackButton />
      <Drawer />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile />
      </ScrollView>
    </View>
  );
};

export default index;

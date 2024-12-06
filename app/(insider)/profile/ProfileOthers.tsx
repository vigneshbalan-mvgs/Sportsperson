import { View, Text, ScrollView } from "react-native";
import React from "react";
import Profile from "@components/Profile/ProfileUser";
import BackButton from "@components/back";

const index = () => {
  return (
    <View style={{ flex: 1 }}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile />
      </ScrollView>
    </View>
  );
};

export default index;

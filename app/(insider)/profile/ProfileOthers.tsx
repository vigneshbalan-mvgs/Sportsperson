import { View, Text, ScrollView } from "react-native";
import React from "react";
import Profile from "@components/Profile/ProfileUser";
import BackButton from "@components/back";
import { useRoute } from "@react-navigation/native";


const index = () => {
  const route = useRoute();
  const { postId } = route.params; // Access the OTP, bearer token, and email
  console.log("data is", postId);
  return (
    <View style={{ flex: 1 }}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile userId={postId} />
      </ScrollView>
    </View>
  );
};

export default index;

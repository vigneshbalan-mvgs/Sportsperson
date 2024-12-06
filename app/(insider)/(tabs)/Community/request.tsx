import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackButton from "@components/back";

const request = () => {
  return (
    <View>
      <BackButton />
      <Text>request</Text>
    </View>
  );
};

export default request;

const styles = StyleSheet.create({});

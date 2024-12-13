import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import PagerView from "react-native-pager-view";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import People from "./People";
import { LocationModule } from "@faker-js/faker/.";
import Location from "./Location";
import Posts from "./Posts";
import Videos from "./Videos";

const Result = () => {
  const renderPeopleItem = ({ item }) => (
    <View style={styles.peopleItem}>
      <Image source={item.image} style={styles.profileImage} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0}>
        <View style={styles.page} key="1">
          <People />
        </View>

        <View style={styles.page} key="2">
          <Location />
        </View>

        <View style={styles.page} key="3">
          {/* Add Post Content Here */}
          <Posts />
        </View>

        <View style={styles.page} key="4">
          {/* Add Videos Content Here */}
          <Videos />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  backButton: {
    marginRight: 10,
  },
  searchText: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  peopleItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  nickname: {
    fontSize: 12,
    color: "#888",
  },
  moreButton: {
    marginTop: 10,
    alignItems: "center",
  },
  moreText: {
    color: "red",
    fontSize: 16,
  },
});

export default Result;

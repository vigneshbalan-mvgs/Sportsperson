import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { faker } from "@faker-js/faker";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors, br } from "@/const/colors";
import constStyles from "@/const/Styles";
import { router } from "expo-router";

// Generate mock data using Faker
const generateMockData = () => {
  return Array.from({ length: 15 }, (_, id) => ({
    id: id.toString(),
    image: faker.image.avatar(),
    username: faker.person.firstName(),
    message: faker.lorem.sentence(),
    time: faker.date
      .recent()
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    notify: faker.number.int({ min: 1, max: 10 }).toString(),
    isGroup: Math.random() > 0.5, // Randomly decide if it's a group or personal chat
  }));
};

const Index = () => {
  const staticData = generateMockData();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(staticData);

  // Handle the search functionality
  const handleSearch = async () => {
    console.log("Search query:", searchQuery); // Debugging log
    const updatedData = searchQuery
      ? staticData.filter(
          (item) =>
            item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.message.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : staticData;
    console.log("Filtered Data:", updatedData); // Debugging log
    setFilteredData(updatedData);
  };

  // Render the FlatList item
  const render = ({ item }) => (
    <TouchableOpacity
      style={styles.third_headerContainer}
      onPress={() => {
        if (item.isGroup) {
          router.push({ pathname: "/(insider)/GroupChat", params: { item } });
        } else {
          router.push({ pathname: "/(insider)/Chat", params: { item } });
        }
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <View style={styles.pic_Container}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 50 }}
            resizeMode="cover"
            source={{ uri: item.image }}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.username} numberOfLines={1}>
            {item.username}
          </Text>
          <Text style={styles.message} numberOfLines={1}>
            {item.message}
          </Text>
        </View>
      </View>
      <View style={styles.NotifyContainer}>
        <Text style={styles.NotifyTime}>{item.time}</Text>
        <View style={styles.NotifyCon}>
          <Text style={styles.Notifyno}>{item.notify}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Header with Search Bar
  const header = () => (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.labelleft}>Chats</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => router.push("/(insider)/groupDetails1")}
        >
          <MaterialIcons name="group-add" color={colors.primary} size={28} />
        </TouchableOpacity>
      </View>
      <View style={styles.Sec_headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          selectionColor={colors.primary}
          onChangeText={(text) => {
            handleSearch();
            setSearchQuery(text);
          }}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <AntDesign name="search1" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={constStyles.container}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={render}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
      />
    </View>
  );
};

export default Index;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  labelleft: {
    marginLeft: 10,
    fontSize: 24,
  },
  Sec_headerContainer: {
    alignContent: "center",
    marginTop: 10,
    width: "100%",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 10, height: 10 },
    elevation: 3,
  },
  third_headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  pic_Container: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
  },
  messageContainer: {
    width: "70%",
  },
  NotifyContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  NotifyCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  Notifyno: {
    marginTop: 10,
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: br.input,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  searchIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

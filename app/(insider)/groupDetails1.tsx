import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import BackButton from "@components/back";
import RightIcon from "@components/RightIcon";
import { router } from "expo-router";

const GroupDetails1 = () => {
  const generateMembers = () => {
    const membersArray = Array.from({ length: 20 }).map((_, index) => ({
      id: index + 1,
      name: faker.person.firstName(),
      selected: Math.random() < 0.3,
      image: faker.image.avatar(),
    }));
    return membersArray;
  };

  const [members, setMembers] = useState(generateMembers());

  const toggleSelection = (id) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, selected: !member.selected } : member,
      ),
    );
  };

  const renderMember = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleSelection(item.id)}
      style={[styles.memberCard, item.selected && styles.selectedCard]}
    >
      <Image source={{ uri: item.image }} style={styles.memberImage} />
      <Text style={styles.memberName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSelectedMember = ({ item }) => (
    <View style={styles.selectedMember}>
      <Image source={{ uri: item.image }} style={styles.selectedImage} />
      <Text style={styles.selectedCheck}>✔️</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButton />
      <RightIcon
        onPress={() => {
          router.push("/(insider)/groupdetails2");
        }}
      />

      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity />
        <Text style={styles.title}>Select Group Member</Text>
        <TouchableOpacity />
      </View>

      {/* Search UI */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../../assets/icons/binocular.png")}
          resizeMode="contain"
          style={{ width: 30 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Members"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={{ height: 100 }}>
        {/* Selected Members - Horizontal Scroll */}
        <FlatList
          data={members.filter((m) => m.selected)}
          renderItem={renderSelectedMember}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectedList}
        />
      </View>

      {/* Full Members List - Vertical Scroll */}
      <FlatList
        data={members}
        renderItem={renderMember}
        keyExtractor={(item) => item.id.toString()}
        style={styles.membersList}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default GroupDetails1;

// Fixed styles with alignment fixes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  selectedList: {
    paddingVertical: 5,
    height: 100,
  },
  membersList: {
    flex: 1,
    marginBottom: 10,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: "#e6f7e6",
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberName: {
    fontSize: 16,
    color: "#333",
  },
  selectedMember: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedImage: {
    width: 70,
    height: 70,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#4caf50",
  },
  selectedCheck: {
    position: "absolute",
    fontSize: 14,
    color: "#4caf50",
  },
});

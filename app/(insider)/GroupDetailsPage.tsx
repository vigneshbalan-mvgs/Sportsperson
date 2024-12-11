import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { faker } from "@faker-js/faker";
import BackButton from "@components/back";
import RightIcon from "@components/RightIcon";

faker.seed(123); // Ensures the same data every time for testing

const generateFakeUsers = () => {
  return Array.from({ length: 200 }, () => ({
    id: faker.number.int(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  }));
};

const GroupInfoScreen = () => {
  const users = generateFakeUsers();

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackButton />
      <RightIcon icon="user" />
      <View style={styles.header}>
        <View></View>
        <Text style={styles.headerTitle}>Group Info</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      {/* Group Info */}
      <View style={styles.groupInfo}>
        <View style={styles.groupIcon} />
        <Text style={styles.groupName}>Group Name</Text>
        <Text style={styles.groupDescription}>Group Description</Text>
      </View>

      {/* People List */}
      <Text style={styles.sectionTitle}>Peoples</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.userCard}>
            <Image source={{ uri: item.image }} style={styles.userImage} />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{item.name}</Text>
              {index === 0 && <Text style={styles.adminBadge}>Admin</Text>}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shareButton: {
    fontSize: 24,
  },
  groupInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  groupIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#ddd",
    borderRadius: 50,
    marginBottom: 10,
  },
  groupName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  groupDescription: {
    fontSize: 14,
    color: "#aaa",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  userName: {
    fontSize: 16,
    color: "#000",
  },
  adminBadge: {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
  },
});

export default GroupInfoScreen;

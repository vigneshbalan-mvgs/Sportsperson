import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  Alert,
} from "react-native";
import { faker } from "@faker-js/faker"; // Ensure faker is installed
import { colors } from "@/const/colors";
import { router } from "expo-router";
import BackButton from "@components/back";
import PagerView from "react-native-pager-view"; // Import PagerView

// Function to generate mock data
const generateTeam = (teamSize = 12) => {
  return Array.from({ length: teamSize }).map(() => ({
    id: faker.number.int(),
    name: faker.person.fullName(),
    position: faker.helpers.arrayElement([
      "Forward",
      "Midfielder",
      "Defender",
      "Goalkeeper",
    ]),
    image: faker.image.avatar(), // Generates a random avatar image
  }));
};

const myTeamPlayers = generateTeam();
const opponentTeamPlayers = generateTeam();

const CheckTeams = () => {
  const [selectedTab, setSelectedTab] = useState("My Team");
  const pagerRef = useRef(null); // PagerView reference

  // Handle button press to navigate between tabs
  const handleTabChange = (tab, index) => {
    setSelectedTab(tab);
    pagerRef.current.setPage(index); // Navigate to corresponding page index
  };

  const renderPlayer = ({ item }) => (
    <View style={styles.playerCard}>
      <Image source={{ uri: item.image }} style={styles.playerImage} />
      <Text style={styles.playerText}>{item.name}</Text>
      <Text style={styles.playerText}>{item.position}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackButton />
      <View style={styles.header}>
        <Text style={styles.matchTime}>Match Time</Text>
        <Text style={styles.matchTime}>21.10.2024, 6:00 PM</Text>
      </View>

      {/* Tabs Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabChange("My Team", 0)}
          style={[
            styles.tabButton,
            selectedTab === "My Team" && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "My Team" && styles.activeTabText,
            ]}
          >
            My Team
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabChange("Opponent Team", 1)}
          style={[
            styles.tabButton,
            selectedTab === "Opponent Team" && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Opponent Team" && styles.activeTabText,
            ]}
          >
            Opponent Team
          </Text>
        </TouchableOpacity>
      </View>

      {/* PagerView */}
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={(e) => {
          setSelectedTab(
            e.nativeEvent.position === 0 ? "My Team" : "Opponent Team",
          );
        }}
      >
        {/* My Team Tab */}
        <View style={styles.page}>
          <FlatList
            data={myTeamPlayers}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPlayer}
            contentContainerStyle={styles.playerList}
          />
        </View>

        {/* Opponent Team Tab */}
        <View style={styles.page}>
          <FlatList
            data={opponentTeamPlayers}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPlayer}
            contentContainerStyle={styles.playerList}
          />
        </View>
      </PagerView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => router.push("/Teambuild/TeamBuildChat")}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>My Team Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/Teambuild/TeamBuildChat")}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>Common Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => Alert.alert("My Team Chat")}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckTeams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "space-between", // Added to help with spacing footer and content
  },
  header: {
    width: "100%",
    height: 50,
    marginBottom: 16,
    marginTop: 20,
    justifyContent: "center", // Added to center content vertically
    alignItems: "center", // Added to center content horizontally
    elevation: 5,
  },
  matchTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center", // Added for center alignment of text
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-around", // Changed for better spacing between tabs
    alignItems: "center", // Ensure vertical alignment
  },
  tabButton: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center", // Added to align the tab text center
  },
  activeTabText: {
    color: "#fff",
  },
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center", // Ensures the list items are centered
  },
  playerList: {
    paddingBottom: 20,
    paddingHorizontal: 10, // Added horizontal padding for spacing
  },
  playerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "flex-start", // Changed to start, you can adjust if needed
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    marginLeft: 10, // Added for better image placement
  },
  playerText: {
    fontSize: 16,
    flex: 1,
    textAlign: "left", // Ensures the text is left-aligned
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    alignItems: "center", // Ensures the buttons are vertically centered
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center", // Ensures the text inside button is centered
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

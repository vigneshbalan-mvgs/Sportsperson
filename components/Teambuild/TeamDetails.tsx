import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { faker } from "@faker-js/faker";
import { Linking } from "react-native";
import constStyles from "@/const/Styles";

const TeamDetails = () => {
  // Generate fake player data
  const players = Array.from({ length: 12 }, (_, index) => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    position: faker.person.jobTitle(),
    profile: faker.image.avatar(),
  }));

  // Scroll position and animated values for each player card
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderPlayer = ({ item, index }) => {
    // Calculate the position of each item relative to the scroll position
    const itemPosition = Animated.subtract(scrollY, index * 100); // 100 is an estimate of item height

    // Animated value for each player card based on its scroll position
    const translateY = itemPosition.interpolate({
      inputRange: [-1, 0, 100], // Scroll range to trigger the shrinking
      outputRange: [0, 0, -50], // Shrink and move up as it scrolls
      extrapolate: "clamp",
    });

    const scale = itemPosition.interpolate({
      inputRange: [-1, 0, 100],
      outputRange: [1, 1, 0.8], // Shrink to 80% when scrolled up
      extrapolate: "clamp",
    });

    const opacity = itemPosition.interpolate({
      inputRange: [-1, 0, 100],
      outputRange: [1, 1, 0], // Fade out as it scrolls up
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.playerItem,
          { transform: [{ translateY }, { scale }], opacity }, // Apply transformation
        ]}
      >
        <Image source={{ uri: item.profile }} style={styles.playerImage} />
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.name}</Text>
          <Text style={styles.playerPosition}>{item.position}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={constStyles.card}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={constStyles.subheadingText}>Team Name</Text>
        <Text style={constStyles.subheadingText}>Team ID</Text>
      </View>

      {/* Team Details */}
      <View style={styles.teamDetails}>
        <Text style={constStyles.badgeText}>Sports: Football</Text>
        <TouchableOpacity
          onPress={() => {
            const location = faker.location.city(); // Get the fake city name
            const url = `https://maps.app.goo.gl/JgxnaMtQQJ7Pu5Vm8`; // Proper URL format
            Linking.openURL(url).catch((err) =>
              console.error("Error opening map:", err),
            ); // Open the URL in Google Maps
          }}
        >
          <Text style={[constStyles.linkTextHovered]}>
            Location: {faker.location.city()}
          </Text>
        </TouchableOpacity>
        <Text style={constStyles.badgeText}>
          Date & Time: {faker.date.future().toLocaleString()}
        </Text>
        <Text style={constStyles.badgeText}>
          Total Players: {players.length}
        </Text>
      </View>

      {/* Players List */}
      <View style={{ width: "100%", height: 300 }}>
        <Text style={styles.playersTitle}>Players:</Text>
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={renderPlayer}
          contentContainerStyle={styles.playerList}
          showsVerticalScrollIndicator={true}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    padding: 20,
    alignSelf: "center",
    borderRadius: 10,
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
  },
  teamDetails: {
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14, // Reduced font size
    marginBottom: 10,
  },
  playersTitle: {
    fontSize: 16, // Reduced font size
    fontWeight: "bold",
    marginBottom: 10,
  },
  playerList: {
    paddingVertical: 10,
  },
  playerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15, // Adjusted margin for spacing between players
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  playerInfo: {
    justifyContent: "center",
  },
  playerName: {
    fontSize: 14, // Reduced font size
    fontWeight: "500",
  },
  playerPosition: {
    fontSize: 12, // Reduced font size
    color: "#555", // Lighter color for position
  },
});

export default TeamDetails;

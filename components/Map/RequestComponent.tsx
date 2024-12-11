import { colors } from "@/const/colors";
import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const requestData = [
  {
    id: "1",
    playerName: "Player one name",
    teamName: "Team One",
    Players: [
      { image: "https://via.placeholder.com/150", playerName: "Player A" },
      { image: "https://via.placeholder.com/150", playerName: "Player B" },
      { image: "https://via.placeholder.com/150", playerName: "Player C" },
      { image: "https://via.placeholder.com/150", playerName: "Player D" },
    ],
  },
  {
    id: "2",
    playerName: "Player two name",
    teamName: "Team Two",
    Players: [
      { image: "https://via.placeholder.com/150", playerName: "Player E" },
      { image: "https://via.placeholder.com/150", playerName: "Player F" },
      { image: "https://via.placeholder.com/150", playerName: "Player G" },
    ],
  },
  {
    id: "3",
    playerName: "Player three name",
    teamName: "Team Three",
    Players: [
      { image: "https://via.placeholder.com/150", playerName: "Player H" },
      { image: "https://via.placeholder.com/150", playerName: "Player I" },
    ],
  },
];

const TeamBuildRequest = () => (
  <View style={{ width: "100%" }}>
    <FlatList
      data={requestData}
      renderItem={({ item }) => (
        <View
          style={[
            styles.card,
            {
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            },
          ]}
        >
          <Text style={styles.teamName}>{item.teamName}</Text>

          {/* Using FlatList for player items to improve performance */}
          <FlatList
            data={item.Players}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(player) => player.playerName}
            contentContainerStyle={styles.playerContainer}
            renderItem={({ item: player }) => (
              <View style={styles.playerContainer}>
                <Image
                  source={{ uri: player.image }}
                  resizeMode="cover"
                  style={styles.playerImage}
                />
                <Text style={styles.playerName}>{player.playerName}</Text>
              </View>
            )}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              accessibilityLabel="Check Players"
              onPress={() => console.log("Check Players")}
            >
              <Text style={styles.buttonText}>Check Players</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              accessibilityLabel="Accept Team"
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: "90%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  teamName: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playerContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginRight: 15, // Space between player items
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  playerName: {
    fontSize: 14,
    fontWeight: "normal",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  acceptButton: {
    backgroundColor: colors.primary,
  },
});

export default TeamBuildRequest;

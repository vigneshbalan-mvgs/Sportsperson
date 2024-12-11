import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import constStyles from "@/const/Styles";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { colors } from "@/const/colors";

const TeamCard = ({ team, filter }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.teamName}>Team Name: {team.teamName}</Text>
      <Text style={styles.teamId}>Team ID: {team.id}</Text>
      <Text style={styles.sportName}>Sport: {team.sportsName}</Text>
      <Text style={styles.totalPlayers}>
        Total Players: {team.totalPlayers}
      </Text>
      <Text style={styles.playersTitle}>Players:</Text>

      {/* Vertical FlatList to display players */}
      <FlatList
        data={team.players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.playerInfo}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => router.push("/(insider)/profile/ProfileOthers")}
              >
                <Text style={styles.username}>{item.username}</Text>
              </TouchableOpacity>
              <Text style={styles.position}>{item.position}</Text>
              <View>
                <Image
                  source={item.image}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {filter === "myTeam" && (
        <TouchableOpacity
          style={[constStyles.primaryButton, styles.editButton]}
          onPress={() => {
            router.push("/(insider)/Community/editTeam");
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const TeamList = () => {
  const [filter, setFilter] = useState("myTeam");

  const filteredData =
    filter === "all"
      ? teamData
      : teamData.filter((team) => team.type === filter);

  return (
    <>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            constStyles.primaryButton,
            filter === "myTeam" && styles.activeButton,
          ]}
          onPress={() => setFilter("myTeam")}
        >
          <Text style={styles.buttonText}>My Team</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            constStyles.primaryButton,
            filter === "forTeam" && styles.activeButton,
          ]}
          onPress={() => setFilter("forTeam")}
        >
          <Text style={styles.buttonText}>As Team Player</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={constStyles.primaryButton}
          onPress={() => router.push("/(insider)/Community/createTeam")}
        >
          <Text style={styles.buttonText}>Create Team</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
        ListFooterComponent={() => <View style={{ height: 100 }}></View>}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TeamCard team={item} filter={filter} />}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: widthPercentageToDP(90),
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  teamId: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  sportName: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  totalPlayers: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  playersTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  playerInfo: {
    marginBottom: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  position: {
    fontSize: 14,
    color: "#666",
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
  },
  editButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
  },
});

export default TeamList;

const teamData = [
  {
    id: 1,
    teamName: "Warriors",
    sportsName: "Basketball",
    totalPlayers: 12,
    type: "myTeam",
    players: [
      {
        username: "player1",
        position: "Point Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "Center",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player4",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },

  {
    id: 2,
    teamName: "Warriors",
    sportsName: "Basketball",
    totalPlayers: 12,
    type: "myTeam",
    players: [
      {
        username: "player1",
        position: "Point Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "Center",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player4",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },
  {
    id: 3,
    teamName: "Warriors",
    sportsName: "Basketball",
    totalPlayers: 12,
    type: "myTeam",
    players: [
      {
        username: "player1",
        position: "Point Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "Center",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player4",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },
  {
    id: 4,
    teamName: "Warriors",
    sportsName: "Basketball",
    totalPlayers: 12,
    type: "myTeam",
    players: [
      {
        username: "player1",
        position: "Point Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "Center",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player4",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },
  {
    id: 5,
    teamName: "Warriors",
    sportsName: "Basketball",
    totalPlayers: 12,
    type: "myTeam",
    players: [
      {
        username: "player1",
        position: "Point Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "Center",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player4",
        position: "Shooting Guard",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },

  {
    id: 6,
    teamName: "Strikers",
    sportsName: "Cricket",
    totalPlayers: 11,
    type: "forTeam",
    players: [
      {
        username: "player1",
        position: "Batsman",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Bowler",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "All-Rounder",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },

  {
    id: 7,
    teamName: "Strikers",
    sportsName: "Cricket",
    totalPlayers: 11,
    type: "forTeam",
    players: [
      {
        username: "player1",
        position: "Batsman",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Bowler",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "All-Rounder",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },

  {
    id: 8,
    teamName: "Strikers",
    sportsName: "Cricket",
    totalPlayers: 11,
    type: "forTeam",
    players: [
      {
        username: "player1",
        position: "Batsman",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Bowler",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "All-Rounder",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },

  {
    id: 9,
    teamName: "Strikers",
    sportsName: "Cricket",
    totalPlayers: 11,
    type: "forTeam",
    players: [
      {
        username: "player1",
        position: "Batsman",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Bowler",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "All-Rounder",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },

  {
    id: 10,
    teamName: "Strikers",
    sportsName: "Cricket",
    totalPlayers: 11,
    type: "forTeam",
    players: [
      {
        username: "player1",
        position: "Batsman",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Bowler",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "All-Rounder",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },

  {
    id: 11,
    teamName: "Strikers",
    sportsName: "Cricket",
    totalPlayers: 11,
    type: "forTeam",
    players: [
      {
        username: "player1",
        position: "Batsman",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player2",
        position: "Bowler",
        image: { uri: "https://via.placeholder.com/50" },
      },
      {
        username: "player3",
        position: "All-Rounder",
        image: { uri: "https://via.placeholder.com/50" },
      },
    ],
  },
];

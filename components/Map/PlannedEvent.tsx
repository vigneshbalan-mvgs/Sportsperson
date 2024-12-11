import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { router } from "expo-router";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Button from "@components/Button";
import { colors, br } from "@/const/colors";

const PlannedEventCard = ({ event }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.teamName}>{event.teamName}</Text>
        <Text style={styles.sport}>{event.sport}</Text>
        <Text style={styles.dateTime}>{event.dateTime}</Text>
      </View>
      <Text style={styles.ground}>{event.ground}</Text>

      <FlatList
        horizontal
        data={event.players}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.player}>
            <Image
              source={item.image}
              style={styles.playerImage}
              resizeMode="cover"
            />
            <Text style={styles.playerName}>{item.name}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.checkButton]}
          onPress={() => router.push("/(insider)/Teambuild/checkPlayers")}
        >
          <Text style={styles.buttonText}>Check Players</Text>
        </TouchableOpacity>
        {event.hasRequest ? (
          <TouchableOpacity
            style={[styles.button, styles.requestButton]}
            onPress={() => router.push("/(insider)/Teambuild/Request")}
          >
            <Text style={styles.buttonText}>Request / Messages</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const PlannedEventsList = () => {
  const eventsData = [
    {
      id: 1,
      teamName: "Team Name",
      sport: "Cricket",
      ground: "Ground Name, District",
      dateTime: "8:00 AM - 12/02/2025",
      players: [
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },

        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },

        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },

        {
          name: "Player Two Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
      ],
      hasRequest: true,
    },
    {
      id: 2,
      teamName: "Team Name",
      sport: "Cricket",
      ground: "Ground Name, District",
      dateTime: "8:00 AM - 12/02/2025",
      players: [
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
        {
          name: "Player Two Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
      ],
      hasRequest: false,
    },
    {
      id: 3,
      teamName: "Team Name",
      sport: "Cricket",
      ground: "Ground Name, District",
      dateTime: "8:00 AM - 12/02/2025",
      players: [
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
        {
          name: "Player Two Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
      ],
      hasRequest: true,
    },
    {
      id: 4,
      teamName: "Team Name",
      sport: "Cricket",
      ground: "Ground Name, District",
      dateTime: "8:00 AM - 12/02/2025",
      players: [
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
        {
          name: "Player One Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
        {
          name: "Player Two Name",
          image: { uri: "https://via.placeholder.com/50" },
        },
      ],
      hasRequest: false,
    },
  ];
  const PlannedEventsListHeader = () => {
    return (
      <View style={{ alignSelf: "center" }}>
        <Button
          title="Create Event"
          onPress={() => router.push("/(tabs)/Community/createEvent")}
        />
      </View>
    );
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={PlannedEventsListHeader}
        ListFooterComponent={() => <View style={{ height: 100 }}></View>}
        data={eventsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PlannedEventCard event={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {},
  card: {
    width: widthPercentageToDP("95%"),
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  teamName: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  sport: {
    fontSize: 12,
    color: "#777",
  },
  dateTime: {
    fontSize: 12,
    color: "#777",
  },
  ground: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  player: {
    flexDirection: "row",
    gap: 10,
    width: widthPercentageToDP("49%"),
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  playerName: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: br.button,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  checkButton: {
    backgroundColor: colors.primary,
  },
  requestButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default PlannedEventsList;

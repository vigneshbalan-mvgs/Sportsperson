import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { faker } from "@faker-js/faker";
import { router } from "expo-router";

const CurrentEvent = () => {
  // Generate event data
  const events = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    team1: faker.company.name(),
    team2: faker.company.name(),
    game: "Cricket",
    ground: `${faker.location.city()}, ${faker.location.state()}`,
    date: faker.date.future().toDateString(),
    time: faker.date.future().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const handleCheckTeam = (event) => {
    console.log("Event Details:", event); // Replace with router.push or navigation logic
    router.push({ pathname: "/(insider)/Teambuild/CheckTeams", params: event });
  };

  return (
    <View style={{ width: "100%" }}>
      <FlatList
        data={events}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }}></View>}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.teamName}>Team Name 1</Text>
              <Text style={styles.game}>{item.game}</Text>
              <Text style={styles.teamName}>Team Name 2</Text>
            </View>
            <Text style={styles.ground}>{item.ground}</Text>
            <Text style={styles.dateTime}>
              {item.time} - {item.date}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleCheckTeam(item)}
              >
                <Text style={styles.buttonText}>Check Team</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleCheckTeam(item)}
              >
                <Text style={styles.buttonText}>Add Memories</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "lightgreen",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  game: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  ground: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 10,
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CurrentEvent;

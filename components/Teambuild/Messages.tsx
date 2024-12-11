// TeamBuildMessage.js
import constStyles from "@/const/Styles";
import { br, colors } from "@/const/colors";
import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const messageData = [
  {
    id: "1",
    playerName: "Player one name",
    message: "Message from another captain or manager",
  },
  { id: "2", playerName: "Player two name", message: "Message for the team" },
  { id: "3", playerName: "Player two name", message: "Message for the team" },
  { id: "4", playerName: "Player two name", message: "Message for the team" },
  { id: "5", playerName: "Player two name", message: "Message for the team" },
  { id: "6", playerName: "Player two name", message: "Message for the team" },
  { id: "7", playerName: "Player two name", message: "Message for the team" },
  {
    id: "8",
    playerName: "Player three name",
    message: "Message about the match",
  },
];

const TeamBuildMessage = () => (
  <View style={{ width: "100%" }}>
    <FlatList
      data={messageData}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              resizeMode="cover"
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />

            <Text style={styles.playerName}>{item.playerName}</Text>
          </View>

          <View
            style={[
              constStyles.inputField,
              {
                alignSelf: "flex-start",
                width: "100%",
                marginBottom: 10,
                marginTop: 5,
              },
            ]}
          >
            <Text style={styles.message}>{item.message}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Check Players</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.notWillingButton]}>
              <Text style={styles.buttonText}>Not Willing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.acceptButton]}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="always"
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    />
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: br.button,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  acceptButton: {
    backgroundColor: "limegreen",
  },
  notWillingButton: {
    backgroundColor: colors.secondary,
  },
});

export default TeamBuildMessage;

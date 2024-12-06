import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import BackButton from "@components/back";
import constStyles from "@/const/Styles";
import TextInputComponent from "@components/TextInput";
import Button from "@components/Button";
import { router } from "expo-router";

const editTeam = ({}) => {
  const [teamName, setTeamName] = useState("");
  const [sportsName, setSportsName] = useState("");
  const [players, setPlayers] = useState([
    { username: "player1", position: "Guard" },
    { username: "player2", position: "Forward" },
    { username: "player2", position: "Forward" },
    { username: "player2", position: "Forward" },
    { username: "player2", position: "Forward" },
  ]);

  const addPlayer = () => {
    // Add a new player with empty fields
    setPlayers([...players, { username: "", position: "" }]);
  };

  const team = {
    teamName: teamName,
    sportsName: sportsName,
    totalPlayers: players.length,
    players: players,
  };

  return (
    <View style={constStyles.container}>
      <BackButton />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text
          style={[
            constStyles.headingText,
            { alignSelf: "center", fontSize: 20, marginTop: 10 },
          ]}
        >
          Edit Team
        </Text>

        <View style={{ marginTop: 40 }}>
          <Text style={constStyles.labelText}>Team Name</Text>
          <TextInputComponent
            placeholder="Team Name"
            value={team.teamName}
            onChangeText={setTeamName}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Sports Name</Text>
              <TextInputComponent
                placeholder="Sports Name"
                value={team.sportsName}
                onChangeText={setSportsName}
                style={{ width: "100%" }}
              />
            </View>
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Total Players</Text>
              <TextInputComponent
                placeholder="Total Players"
                value={players.length.toString()} // Dynamically display the total number of players
                editable={false} // Prevent the user from editing this field
                style={{ width: "100%" }}
              />
            </View>
          </View>
          {team.players.map((player, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "49%" }}>
                <Text style={constStyles.labelText}>
                  Player Username {index + 1}
                </Text>
                <TextInputComponent
                  placeholder="Player Username"
                  value={player.username}
                  onChangeText={(text) => {
                    const updatedPlayers = [...players];
                    updatedPlayers[index].username = text;
                    setPlayers(updatedPlayers);
                  }}
                  style={{ width: "100%" }}
                />
              </View>
              <View style={{ width: "49%" }}>
                <Text style={constStyles.labelText}>Position</Text>
                <TextInputComponent
                  placeholder="Position"
                  value={player.position}
                  onChangeText={(text) => {
                    const updatedPlayers = [...players];
                    updatedPlayers[index].position = text;
                    setPlayers(updatedPlayers);
                  }}
                  style={{ width: "100%" }}
                />
              </View>
            </View>
          ))}

          {/* Add Player Button */}
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Button
              title="Add Player"
              type="secondaryHalf"
              onPress={addPlayer}
            />
          </View>
        </View>
        <View
          style={{ marginTop: 40, marginBottom: 100, alignItems: "center" }}
        >
          <Button
            title="Update Team"
            type="primary"
            onPress={() => {
              Alert.alert("Team Updated Successfully");
              router.replace("/(insider)/(tabs)/Community");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default editTeam;

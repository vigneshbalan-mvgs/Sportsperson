import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import BackButton from "@components/back";
import TeamDetails from "@components/Teambuild/TeamDetails";
import constStyles from "@/const/Styles";
import { colors } from "@/const/colors";
import Button from "@components/Button";
import { Dropdown } from "react-native-element-dropdown";
import { router } from "expo-router";
import TextInputComponent from "@components/TextInput";

const data = [
  { label: "Team A", value: "team_a" },
  { label: "Team B", value: "team_b" },
  { label: "Team C", value: "team_c" },
  { label: "Team D", value: "team_d" },
];

const checkPlayers = ({ isCaptain }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isCaptainState, setIsCaptainState] = useState(isCaptain); // Use state for captain status

  const handleRequest = () => {
    setModalVisible(true);
  };

  const handleCancelRequest = () => {
    setModalVisible(false);
    setSelectedTeam(null); // Reset the selected team if needed
  };

  const handleTeamSelection = (team) => {
    setSelectedTeam(team);
    // Handle the team selection logic here
    setModalVisible(false);
    console.log(`Team selected: ${team}`);
  };

  const toggleCaptainStatus = () => {
    // Use setState to toggle captain status
    setIsCaptainState(!isCaptainState);
    console.log(`Captain status toggled: ${!isCaptainState}`);
  };

  return (
    <View style={constStyles.container}>
      <BackButton />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={constStyles.subheadingText}>Team Details</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TeamDetails />
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {!isCaptainState ? (
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Button title="Cancel" type="secondaryAuto" onPress={() => {}} />
            <Button title="Edit" type="primaryAuto" onPress={() => {}} />
          </View>
        ) : (
          <View style={{ flexDirection: "column", gap: 10 }}>
            <View style={{ flexDirection: "column", gap: 10 }}>
              <TextInput
                title="Message"
                placeholder="Message"
                style={{
                  position: "absolute",
                  alignSelf: "flex-start",
                  width: "80%",
                  height: 100,
                }}
              />
              <Button title="Message" type="secondaryAuto" onPress={() => {}} />
            </View>
            <Button
              title="Request"
              type="primaryAuto"
              onPress={handleRequest}
            />
          </View>
        )}
      </View>

      {/* Absolute position button to toggle captain status */}
      <TouchableOpacity
        style={[styles.captainButton, { backgroundColor: colors.primary }]}
        onPress={toggleCaptainStatus}
      >
        <Text style={styles.captainButtonText}>
          {isCaptainState ? "Captain" : "Others"}
        </Text>
      </TouchableOpacity>

      {/* Modal for Team Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancelRequest}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Team</Text>
            <View style={{ width: "100%" }}>
              <Dropdown
                style={[
                  constStyles.inputField,
                  isFocus && { borderColor: colors.primary },
                ]}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select Team" : "..."}
                value={selectedTeam}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSelectedTeam(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={handleCancelRequest}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  handleTeamSelection(selectedTeam);
                  router.back();
                }}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default checkPlayers;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    marginTop: 20,
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  captainButton: {
    position: "absolute",
    top: 20,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  captainButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

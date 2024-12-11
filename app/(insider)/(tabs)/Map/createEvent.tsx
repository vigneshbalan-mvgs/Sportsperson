import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "@components/back";
import constStyles from "@/const/Styles";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "@/const/colors";
import TextInputComponent from "@components/TextInput";
import Button from "@components/Button";
import { router } from "expo-router";

const data = [
  { label: "Team A", value: "team_a" },
  { label: "Team B", value: "team_b" },
  { label: "Team C", value: "team_c" },
  { label: "Team D", value: "team_d" },
];

const CreateEvent = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());

  return (
    <View style={constStyles.container}>
      <BackButton />
      <Text
        style={[
          constStyles.subheadingText,
          { alignSelf: "center", marginTop: 20 },
        ]}
      >
        Create Event
      </Text>
      <ScrollView
        style={constStyles.ScreenContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 40 }}>
          <Text style={constStyles.labelText}>Team Selection</Text>
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
          <View>
            <Text style={constStyles.labelText}>Location</Text>
            <TextInputComponent placeholder="Location" />
          </View>

          <View>
            <Text style={constStyles.labelText}>Location Link</Text>
            <TextInputComponent placeholder="Location Link" />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "49%" }}>
              <Text style={[constStyles.labelText, { marginTop: 20 }]}>
                Event Date
              </Text>
              <TextInputComponent placeholder="Event Date" />
            </View>
            <View style={{ width: "49%" }}>
              <Text style={[constStyles.labelText, { marginTop: 20 }]}>
                Time
              </Text>
              <TextInputComponent placeholder="Time" />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20, alignSelf: "center" }}>
          <Button
            title="Create Event"
            type="primary"
            onPress={() => {
              router.back();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
});

import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "@components/back";
import constStyles from "@/const/Styles";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "@/const/colors";

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
            style={[styles.input, isFocus && { borderColor: colors.primary }]}
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
          <Text style={[constStyles.labelText, { marginTop: 20 }]}>
            Event Date
          </Text>
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

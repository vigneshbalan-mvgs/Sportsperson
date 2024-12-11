import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import BackButton from "@components/back";
import constStyles from "@/const/Styles";
import TextInputComponent from "@components/TextInput";
import Button from "@components/Button";
import { router } from "expo-router";

const createTeam = () => {
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
          Create New Team
        </Text>

        <View style={{ marginTop: 40 }}>
          <Text style={constStyles.labelText}>Team Name</Text>
          <TextInputComponent placeholder="Team Name" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Team Name</Text>
              <TextInputComponent
                placeholder="Sports Name"
                style={{ width: "100%" }}
              />
            </View>
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Total Players</Text>
              <TextInputComponent
                placeholder="Total Players"
                style={{ width: "100%" }}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Player Username</Text>
              <TextInputComponent
                placeholder="Player Username"
                style={{ width: "100%" }}
              />
            </View>
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Position</Text>
              <TextInputComponent
                placeholder="Position"
                style={{ width: "100%" }}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Player Username</Text>
              <TextInputComponent
                placeholder="Player Username"
                style={{ width: "100%" }}
              />
            </View>
            <View style={{ width: "49%" }}>
              <Text style={constStyles.labelText}>Position</Text>
              <TextInputComponent
                placeholder="Position"
                style={{ width: "100%" }}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Button
            title="Create Team"
            type="primary"
            onPress={() => {
              Alert.alert("Team Created Successfully");
              router.replace("/(insider)/(tabs)/Community");
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default createTeam;

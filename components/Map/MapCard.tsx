import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const EventCard = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.companyName}>Event Name</Text>
          {/* <Text style={styles.location}>Location</Text> */}
        </View>
        <TouchableOpacity>
          <Text style={styles.options}>⋮</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: "https://via.placeholder.com/300x150" }}
        style={styles.mapImage}
      />

      {/* <View style={styles.iconsRow}> */}
      {/*   <View style={{ flexDirection: "row" }}> */}
      {/*     <Image */}
      {/*       source={require("../../assets/icons/success-1.png")} */}
      {/*       style={styles.icon} */}
      {/*     /> */}
      {/*     <Text style={styles.iconText}>234</Text> */}
      {/*   </View> */}
      {/*   <AntDesign name="" size={24} color="black" /> */}
      {/*   <AntDesign name="clockcircleo" size={24} color="black" /> */}
      {/* </View> */}

      <Text style={styles.dateTime}>From - To, Date - Time</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  companyName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  location: {
    color: "#777",
    fontSize: 14,
  },
  options: {
    fontSize: 18,
    color: "#777",
  },
  mapImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconText: {
    marginRight: 15,
    fontSize: 16,
  },
  icon: {
    marginRight: 15,
    fontSize: 16,
  },
  dateTime: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EventCard;

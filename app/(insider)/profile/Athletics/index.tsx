import React, { useState, useMemo } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For green icon and other icons
import BackButton from "@components/back";
import RightIcon from "@components/RightIcon";
import constStyles from "@/const/Styles";
import Toast from "react-native-toast-message";
import { colors, theme } from "@/const/colors";
import { router } from "expo-router";

const data = [
  {
    id: "1",
    eventName: "100m Sprint",
    experience: 4,
    competitions: 399,
  },
  {
    id: "2",
    eventName: "Marathon",
    experience: 3,
    competitions: 200,
  },
  {
    id: "3",
    eventName: "High Jump",
    experience: 5,
    competitions: 150,
  },
  {
    id: "4",
    eventName: "Pole Vault",
    experience: 2,
    competitions: 100,
  },
  {
    id: "5",
    eventName: "Long Jump",
    experience: 4,
    competitions: 250,
  },
  {
    id: "6",
    eventName: "400m Hurdles",
    experience: 3,
    competitions: 180,
  },
  {
    id: "7",
    eventName: "Shot Put",
    experience: 5,
    competitions: 320,
  },
  {
    id: "8",
    eventName: "Discus Throw",
    experience: 4,
    competitions: 215,
  },
  {
    id: "9",
    eventName: "Javelin Throw",
    experience: 3,
    competitions: 150,
  },
  {
    id: "10",
    eventName: "Hammer Throw",
    experience: 6,
    competitions: 500,
  },
  {
    id: "11",
    eventName: "Triple Jump",
    experience: 5,
    competitions: 100,
  },
  {
    id: "12",
    eventName: "Decathlon",
    experience: 7,
    competitions: 45,
  },
  {
    id: "13",
    eventName: "Relay Race",
    experience: 4,
    competitions: 25,
  },
  {
    id: "14",
    eventName: "Steeplechase",
    experience: 5,
    competitions: 150,
  },
  {
    id: "15",
    eventName: "800m Run",
    experience: 3,
    competitions: 50,
  },
  {
    id: "16",
    eventName: "1500m Run",
    experience: 2,
    competitions: 100,
  },
  {
    id: "17",
    eventName: "Race Walking",
    experience: 4,
    competitions: 180,
  },
  {
    id: "18",
    eventName: "Cross Country",
    experience: 5,
    competitions: 220,
  },
  {
    id: "19",
    eventName: "5,000m Run",
    experience: 3,
    competitions: 75,
  },
  {
    id: "20",
    eventName: "10,000m Run",
    experience: 2,
    competitions: 50,
  },
];

const App = () => {
  const [selectedCards, setSelectedCards] = useState([]);

  // Memoize sorted data
  const sortedData = useMemo(() => {
    return [
      ...data.filter((item) => selectedCards.includes(item.id)), // Selected items first
      ...data.filter((item) => !selectedCards.includes(item.id)), // Non-selected items
    ];
  }, [selectedCards]); // Only recalculate when selectedCards change

  // Handle selection of a card
  const handleSelect = (item) => {
    setSelectedCards((prevSelectedCards) => {
      const isSelected = prevSelectedCards.includes(item.id);
      if (isSelected) {
        return prevSelectedCards.filter((id) => id !== item.id); // Deselect
      } else if (prevSelectedCards.length < 5) {
        return [...prevSelectedCards, item.id]; // Select
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error!",
          text2: "You can only select up to 5 cards.",
          visibilityTime: 3000,
          autoHide: true,
        });
        return prevSelectedCards; // Do nothing if limit reached
      }
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedCards.includes(item.id);
    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard, // Apply green border if selected
        ]}
        onPress={() => handleSelect(item)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.gameName}>{item.eventName}</Text>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color="#52E34F" />
          )}
        </View>
        <Text style={styles.details}>Experience: {item.experience} years</Text>
        <Text style={styles.details}>Competitions: {item.competitions}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <BackButton />
      <RightIcon
        onPress={() => {
          router.push("/profile/Athletics/AddNewSportProfile");
        }}
      />
      <View style={{ alignItems: "center", marginTop: 45, marginBottom: 20 }}>
        <Text style={constStyles.subheadingText}>Athletics Profile</Text>
        <Text style={constStyles.mutedText}>
          Select Only 5 that will be shown in your profile
        </Text>
      </View>

      {/* FlatList Section */}
      <FlatList
        data={sortedData} // Use the sorted data
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Two cards per row
        columnWrapperStyle={styles.row} // Align items in a row
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    justifyContent: "space-between", // Space between cards in a row
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: theme.br.card,
    padding: 10,
    marginHorizontal: 5,
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "#fff",
  },
  selectedCard: {
    borderColor: "#52E34F",
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 14,
    marginVertical: 4,
    color: "#555",
  },
  editButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;

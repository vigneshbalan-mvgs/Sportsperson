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
    gameName: "Cricket",
    experience: 4,
    matches: 399,
    position: "Batsman",
  },
  {
    id: "2",
    gameName: "Football",
    experience: 3,
    matches: 200,
    position: "Goalkeeper",
  },
  {
    id: "3",
    gameName: "Basketball",
    experience: 5,
    matches: 150,
    position: "Point Guard",
  },
  {
    id: "4",
    gameName: "Tennis",
    experience: 2,
    matches: 100,
    position: "Singles",
  },
  {
    id: "5",
    gameName: "Hockey",
    experience: 4,
    matches: 250,
    position: "Forward",
  },
  {
    id: "6",
    gameName: "Badminton",
    experience: 3,
    matches: 180,
    position: "Doubles",
  },
  {
    id: "7",
    gameName: "Table Tennis",
    experience: 5,
    matches: 320,
    position: "Singles",
  },
  {
    id: "8",
    gameName: "Baseball",
    experience: 4,
    matches: 215,
    position: "Pitcher",
  },
  {
    id: "9",
    gameName: "Volleyball",
    experience: 3,
    matches: 150,
    position: "Libero",
  },
  {
    id: "10",
    gameName: "Rugby",
    experience: 6,
    matches: 500,
    position: "Fullback",
  },
  {
    id: "11",
    gameName: "Golf",
    experience: 5,
    matches: 100,
    position: "Golfer",
  },
  {
    id: "12",
    gameName: "Boxing",
    experience: 7,
    matches: 45,
    position: "Heavyweight",
  },
  {
    id: "13",
    gameName: "Swimming",
    experience: 4,
    matches: 25,
    position: "Freestyle",
  },
  {
    id: "14",
    gameName: "Cycling",
    experience: 5,
    matches: 150,
    position: "Road Racer",
  },
  {
    id: "15",
    gameName: "Athletics",
    experience: 3,
    matches: 50,
    position: "Sprinter",
  },
  {
    id: "16",
    gameName: "Archery",
    experience: 2,
    matches: 100,
    position: "Archery",
  },
  {
    id: "17",
    gameName: "Softball",
    experience: 4,
    matches: 180,
    position: "Catcher",
  },
  {
    id: "18",
    gameName: "Handball",
    experience: 5,
    matches: 220,
    position: "Goalkeeper",
  },
  {
    id: "19",
    gameName: "Fencing",
    experience: 3,
    matches: 75,
    position: "Fencer",
  },
  {
    id: "20",
    gameName: "Skiing",
    experience: 2,
    matches: 50,
    position: "Slalom",
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
          <Text style={styles.gameName}>{item.gameName}</Text>
          {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color="#52E34F" />
          )}
        </View>
        <Text style={styles.details}>Experience: {item.experience} years</Text>
        <Text style={styles.details}>Matches: {item.matches}</Text>
        <Text style={styles.details}>Position: {item.position}</Text>
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
          router.push("/profile/Sports/AddNewSportProfile");
        }}
      />
      <View style={{ alignItems: "center", marginTop: 45, marginBottom: 20 }}>
        <Text style={constStyles.subheadingText}>Sport Profile</Text>
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

import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const History = ({ onSearchSelect }) => {
  const [historyData, setHistoryData] = useState([
    "React Native",
    "JavaScript",
    "Expo",
    "React Hooks",
    "Component Design",
  ]);

  const handleSelectSearch = (searchTerm) => {
    onSearchSelect(searchTerm); // Pass selected term to parent component
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectSearch(item)}>
      <View style={styles.historyItem}>
        <Text style={styles.historyText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Search History</Text>
      <FlatList
        data={historyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  historyContainer: {
    padding: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  historyText: {
    fontSize: 16,
    color: "#07001f",
  },
});

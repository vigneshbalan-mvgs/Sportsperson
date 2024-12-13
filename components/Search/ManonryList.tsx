import { colors } from "@/const/colors";
import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const MasonryLayout = ({ data, onItemPress }) => {
  // State to store the selected filter
  const [selectedFilter, setSelectedFilter] = useState(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.item, styles.colItem]}>
        <TouchableOpacity onPress={() => onItemPress(item.id)}>
          <Text>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFilterContainer = () => {
    const filterData = [
      ["Filter 1", "Filter 2", "Filter 3", "Filter 4", "Filter 5", "Filter 6"],
      ["Filter 1", "Filter 2", "Filter 3", "Filter 4", "Filter 5", "Filter 6"],
      ["Filter 1", "Filter 2", "Filter 3", "Filter 4", "Filter 5", "Filter 6"],
    ];

    const renderFilterItem = ({ item }) => {
      const isSelected = item === selectedFilter; // Check if the filter is selected

      return (
        <TouchableOpacity
          style={[
            styles.filterButton,
            isSelected && styles.selectedFilterButton,
          ]} // Apply selected style
          onPress={() => setSelectedFilter(item)} // Set selected filter
        >
          <Text
            style={[styles.filterText, isSelected && styles.selectedFilterText]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.filterContainer}>
        {filterData.map((filterGroup, index) => (
          <FlatList
            key={index}
            data={filterGroup}
            renderItem={renderFilterItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          />
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      ListHeaderComponent={renderFilterContainer}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={(item, index) => item.id.toString()} // Use item.id if available
      contentContainerStyle={styles.container}
    />
  );
};

const { width } = Dimensions.get("window");
const itemWidth = (width - 30) / 3; // Dynamically calculate item width based on screen size

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
  },
  colItem: {
    width: itemWidth, // Dynamically set the item width
    aspectRatio: 1, // Ensure items have a square aspect ratio
    backgroundColor: "#ccc", // Default background color
    elevation: 5,
    marginBottom: 10,
  },
  filterContainer: {
    width: "100%",
    padding: 10,
  },
  filterList: {
    flexDirection: "row",
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedFilterButton: {
    backgroundColor: "#ff9900", // Change the color when selected
  },
  filterText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedFilterText: {
    color: "#000", // Change text color when selected
  },
});

export default MasonryLayout;

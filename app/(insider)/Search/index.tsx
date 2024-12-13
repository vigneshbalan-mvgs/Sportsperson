import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import MasonryList from "@/components/Search/ManonryList";
import { router } from "expo-router";
import History from "@components/Search/History";
import Result from "@components/Search/Result";

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const data = [
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
    { id: 6, text: "6" },
    { id: 7, text: "7" },
    { id: 8, text: "8" },
    { id: 9, text: "9" },
    { id: 10, text: "10" },
  ];

  // Handle the search input focus and blur
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setIsResult(false); // Reset the result view when focusing on search input
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  // Toggle search results view
  const toggleResultView = () => {
    if (!isResult) {
      setIsResult(true);
    }
  };

  // Reset to the initial state
  const resetSearchScreen = () => {
    setSearchValue("");
    setIsSearchFocused(false);
    setIsResult(false);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={styles.searchContainer}>
          {/* Back button (will reset state when on the result page) */}
          {isResult ? (
            <TouchableOpacity onPress={resetSearchScreen}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="arrowleft" size={20} color="black" />
            </TouchableOpacity>
          )}

          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={setSearchValue}
            onFocus={handleSearchFocus}
            onSubmitEditing={() => setIsResult(true)}
            onBlur={handleSearchBlur}
          />

          {/* Binoculars icon to toggle search results */}
          <TouchableOpacity onPress={toggleResultView} disabled={isResult}>
            <FontAwesome5 name="binoculars" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Masonry list shown when not focused or showing results */}
      {!isSearchFocused && !isResult && <MasonryList data={data} />}

      {/* History shown when the search input is focused */}
      {isSearchFocused && !isResult && (
        <History onSearchSelect={setSearchValue} />
      )}

      {/* Show search result if available */}
      {isResult && <Result />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 15,
    height: 80,
    justifyContent: "center",
    shadowRadius: 5,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default SearchScreen;

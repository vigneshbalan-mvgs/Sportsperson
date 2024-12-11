import BackButton from "@components/back";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import { colors } from "@/const/colors"; // Import colors from the const file
import Info from "@components/info/Info";
import News from "@components/info/News";
import constStyles from "@/const/Styles";

const MyPager = () => {
  // State to track the current page index
  const [currentPage, setCurrentPage] = useState(0);

  // Create a reference for the PagerView to control programmatically
  const pagerRef = useRef(null);

  const handlePageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position); // Update current page on swipe
  };

  // Define the names for each page
  const pageNames = ["Info", "News"];

  // Function to handle tab click and switch pages
  const handleTabClick = (index) => {
    setCurrentPage(index); // Update the current page state
    pagerRef.current.setPage(index); // Programmatically change the page in PagerView
  };

  // Function to get different styles for active and inactive tabs
  const getTabStyle = (index) => {
    // Active tab styles
    const activeStyle = {
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
    };

    // Inactive tab styles
    const inactiveStyle = {
      backgroundColor: "transparent",
      borderBottomWidth: 0,
      opacity: 0.5,
      borderBottomColor: "transparent",
    };

    // Return the active style if the tab is selected, otherwise the inactive style
    return currentPage === index ? { ...activeStyle } : { ...inactiveStyle };
  };

  return (
    <View style={constStyles.container}>
      <BackButton />
      {/* Top Bar with active tab display */}

      <View style={styles.topBar}>
        {/* Tab for Folder 1 */}
        <TouchableOpacity
          style={[styles.tab, getTabStyle(0)]}
          onPress={() => handleTabClick(0)} // Switch to the first page
        >
          <Text style={styles.tabText}>{pageNames[0]}</Text>
        </TouchableOpacity>

        {/* Tab for Folder 2 */}
        <TouchableOpacity
          style={[styles.tab, getTabStyle(1)]}
          onPress={() => handleTabClick(1)} // Switch to the second page
        >
          <Text style={styles.tabText}>{pageNames[1]}</Text>
        </TouchableOpacity>
      </View>

      {/* PagerView */}
      <PagerView
        ref={pagerRef} // Link the PagerView to the ref
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={true} // Enable horizontal scrolling for the pages
        onPageSelected={handlePageSelected} // Track page changes
      >
        <View key="1">
          <Info />
        </View>

        <View key="2">
          <News />
        </View>
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  topBar: {
    height: 60,
    flexDirection: "row", // Horizontal tab layout
    width: "100%", // Control the width of the tab bar
    justifyContent: "center",
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    color: "#07001f",
    fontWeight: "bold",
  },
});

export default MyPager;

import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import ConstStyles from "@/const/Styles";
import { colors, fontSizes } from "@/const/colors";
import { router } from "expo-router";
import BackButton from "@components/back";
import Request from "@components/Teambuild/RequestComponent";
import Messages from "@components/Teambuild/Messages";

const Add = () => {
  const [team, setTeam] = useState(true); // Boolean to handle if team exists
  const [currentPage, setCurrentPage] = useState(0); // Track which page is active
  const pagerRef = useRef(null); // PagerView reference

  const pages = ["Request's", "Messages"]; // Tab names

  return (
    <View style={ConstStyles.container}>
      <BackButton />
      {/* Top Bar */}
      <View style={styles.top}>
        <Text style={ConstStyles.subheadingText}>Team Build</Text>
      </View>

      <View style={{ flex: 1 }}>
        {/* Page Tabs */}
        <View style={styles.topBar}>
          {pages.map((page, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.topBarButton,
                currentPage === index && styles.activeButton,
              ]}
              onPress={() => {
                setCurrentPage(index);
                pagerRef.current?.setPage(index); // Navigate to the selected page
              }}
            >
              <Text
                style={[
                  styles.topBarText,
                  currentPage === index && {
                    color: "black",
                    fontWeight: "bold",
                  },
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PagerView */}
        <PagerView
          ref={pagerRef} // Attach the reference to PagerView
          style={{ flex: 1 }}
          initialPage={0} // Start with the first page
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)} // Update current page on swipe
        >
          {/* Page 1: Requests */}
          <View key={1} style={styles.page}>
            <Request />
          </View>

          {/* Page 2: Messages */}
          <View key={2} style={styles.page}>
            <Messages />
          </View>
        </PagerView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    alignItems: "center",
    marginBottom: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  topBarButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  topBarText: {
    fontSize: fontSizes.sm,
    color: "rgba(0, 0, 0, 0.5)",
  },
  page: {
    flex: 1,
    alignItems: "center",
  },
  toggleButton: {
    position: "absolute",
    top: 20,
    right: 20,
    alignSelf: "center",
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
});

export default Add;

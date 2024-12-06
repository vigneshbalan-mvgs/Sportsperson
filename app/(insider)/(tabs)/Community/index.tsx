import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import ConstStyles from "@/const/Styles";
import { colors, fontSizes } from "@/const/colors";
import { router } from "expo-router";
import Finished from "@components/Teambuild/Finished";
import CurrentEvent from "@components/Teambuild/CurrentEvent";
import PlannedEvent from "@components/Teambuild/PlannedEvent";
import Teams from "@components/Teambuild/Teams";

const Add = () => {
  const [team, setTeam] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null); // Reference to PagerView

  const pages = ["Finished", "Current Event", "Planned Event", "Teams"];

  return (
    <View style={ConstStyles.container}>
      {/* Top Bar */}
      <View style={styles.top}>
        <Text style={ConstStyles.subheadingText}>Team Build</Text>
      </View>

      {team ? (
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
            ref={pagerRef} // Attach the reference
            style={{ flex: 1 }}
            initialPage={4}
            onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
          >
            <View key={1} style={styles.page}>
              <Finished />
            </View>

            <View key={2} style={styles.page}>
              <CurrentEvent />
            </View>

            <View key={3} style={styles.page}>
              <PlannedEvent />
            </View>

            <View key={4} style={styles.page}>
              <Teams />
            </View>
          </PagerView>
        </View>
      ) : (
        <View style={styles.page}>
          <Text style={ConstStyles.subheadingText}>There Is No Team !!</Text>
          <Text></Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(insider)/(tabs)/Community/createTeam");
            }}
          >
            <Text style={ConstStyles.linkTextLine}>Create New Team</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setTeam(!team)}
      >
        <Text style={styles.toggleButtonText}>
          {team ? "Show No Team" : "Show 4 Views"}
        </Text>
      </TouchableOpacity>
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
    justifyContent: "center",
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

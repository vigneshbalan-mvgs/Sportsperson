import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { colors, theme } from "../../const/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import Sports from "./Sports";
import { router } from "expo-router";

const Profile = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Dummy Data for Posts
  const posts = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    // Add more posts here
  ];

  const [activeTab, setActiveTab] = useState("posts");

  const renderPosts = () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {posts.map((item, index) => (
        <TouchableOpacity style={styles.postItem} key={index}>
          {/* Add unique key */}
          <Image source={{ uri: item }} style={styles.postImage} />
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Cover Photo */}
      <Image
        source={{ uri: "https://via.placeholder.com/600x200" }}
        style={styles.coverImage}
      />

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.profilePictureWrapper}>
          {/* <Image */}
          {/*   source={{ uri: user?.photoURL }} */}
          {/*   style={styles.profileImage} */}
          {/* /> */}
          <View>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.username}>{user?.displayName}</Text>
          <Text style={styles.username}>
            <Ionicons name="location" size={20} color={colors.text} />
            Location
          </Text>
        </View>
      </View>

      <Sports />

      <View style={styles.userInfoSection}>
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => {
              router.push("/(insider)/profile/Stats");
            }}
          >
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Cheerer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => {
              router.push("/(insider)/profile/Stats");
            }}
          >
            <Text style={styles.statValue}>500</Text>
            <Text style={styles.statLabel}>Cheering</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "posts" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "posts" && styles.activeTabText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
      </View>
      {renderPosts()}

      {/* Content Display based on Active Tab */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  coverImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  profilePictureWrapper: {
    borderWidth: theme.bw.thin,
    borderColor: theme.colors.background,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: -75,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  cameraIconWrapper: {
    position: "absolute",
    bottom: 5,
    right: 5,
    zIndex: 100,
    backgroundColor: "white", // White background for contrast
    borderRadius: 50,
    padding: 5, // Ensures the icon doesn't touch the edges
  },
  cameraIcon: {
    backgroundColor: colors.primary, // Ensuring the icon has the desired background
    padding: 3, // Adjust padding to make it look better
    borderRadius: 50, // To make the background circle around the icon
  },
  userInfoSection: {
    paddingHorizontal: theme.spacing.md,
  },
  username: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.lg,
    marginBottom: theme.spacing.sm,
    textAlign: "center",
  },
  bio: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: theme.spacing.lg,
  },
  statItem: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  statValue: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.md,
  },
  statLabel: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondaryLight,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: theme.spacing.lg, // Use spacing from theme
  },
  button: {
    backgroundColor: theme.colors.primary, // Use primary color from theme
    paddingVertical: theme.spacing.sm, // Use spacing from theme
    paddingHorizontal: theme.spacing.md, // Use spacing from theme
    borderRadius: theme.br.button, // Use border radius from theme
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: theme.spacing.md,
  },
  tab: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.primary,
  },
  activeTabText: {
    color: theme.colors.primaryDark,
  },
  postsGrid: {
    flex: 1,
  },
  postItem: {
    width: wp("33.3%"),
    padding: 5,
  },
  postImage: {
    width: "100%",
    height: wp("33.3%"),
    borderRadius: 10,
    resizeMode: "cover",
  },
});

export default Profile;

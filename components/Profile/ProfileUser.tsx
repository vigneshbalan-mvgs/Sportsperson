import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
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
import constStyles from "@/const/Styles";
import Button from "@components/Button";
import Posts from "./PostGrid";

const Profile = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [posts, setPosts] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Dummy Data for Posts and Events

  const [activeTab, setActiveTab] = useState("posts");
  return (
    <View style={styles.container}>
      {/* Cover Photo */}
      <Image
        source={{ uri: "https://via.placeholder.com/600x200" }}
        style={styles.coverImage}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.profilePictureWrapper}>
          <View>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.username}>User Name</Text>
          <Text style={styles.username}>
            <Ionicons name="location" size={20} color={colors.text} />
            Location
          </Text>
        </View>
      </View>
      <Sports />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity style={styles.cheerButton}>
          <Text style={{ color: colors.textWhite }}>Cheer</Text>
          <AntDesign name="adduser" size={23} color={colors.textWhite} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cheerButton}>
          <Text style={{ color: colors.textWhite }}>Message</Text>
          <AntDesign name="adduser" size={23} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Cheerer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem}>
            <Text style={styles.statValue}>500</Text>
            <Text style={styles.statLabel}>Cheering</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Tab Navigation */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "posts" && styles.activeTab]}
          onPress={() => setActiveTab("posts")}
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
      {/* Content Display based on Active Tab */}
      <Posts posts={posts} />
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
  cheerButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
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
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
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
  eventsContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  eventItem: {
    marginBottom: theme.spacing.sm,
  },
  eventName: {
    fontWeight: "bold",
    fontSize: theme.fontSizes.md,
  },
  eventDate: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
});

export default Profile;

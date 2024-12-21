import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, theme } from "../../const/colors";

import { Ionicons } from "@expo/vector-icons";
import Sports from "./Sports";
import { router } from "expo-router";
import Posts from "./PostGrid";
import { PORT } from "../../const/PORT.js";
import useFetchWithToken from "@/const/fetch";

const Profile = ({ userId }) => {
  console.log(userId)
  const { data, loading, error } = useFetchWithToken(
    `${PORT}/api/user/profile/${userId}`,
    "GET",
  );
  console.log(data);
  console.log(loading, error);

  if (loading) {
    console.log("Loading...");
    return null; // or a loading spinner component
  }

  if (error) {
    console.error("Error:", error);
    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: 100 }}>
        <Text style={styles.bio}>{error}</Text>
      </View>

    ); // or an error message component
  }

  const user = data?.info || {};
  console.log(user);

  const SportsInfo = user.sportsInfo || [];

  // Followers and Following Counts
  const followers = user.followersCount || 0;
  const following = user.followingCount || 0;

  // Posts
  const posts = user.myPostKeys || [];

  // Display Data
  console.log({
    user,
    SportsInfo,
    followers,
    following,
    posts,
  });


  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: "https://via.placeholder.com/600x200" }}
          style={styles.coverImage}
        />

        <View style={styles.profilePictureWrapper}>
          <Image
            source={{ uri: 'https://via.placeholder.com/200' }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>{user.userName}</Text>
          <Text style={styles.username}>
            {user.location && (
              <>
                <Ionicons name="location" size={20} color={colors.text} />
                <Text>{user.location}</Text>
              </>
            )}

          </Text>
        </View>

        <Sports data={SportsInfo} />


        <View style={styles.userInfoSection}>
          <View style={styles.statsRow}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("/(insider)/profile/Stats")}
            >
              <Text style={styles.statValue}>{followers}</Text>
              <Text style={styles.statLabel}>Cheerer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("/(insider)/profile/Stats")}
            >
              <Text style={styles.statValue}>{following}</Text>
              <Text style={styles.statLabel}>Cheering</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Tab Navigation */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.activeTab}>
          <Text>Posts</Text>
        </TouchableOpacity>
      </View>
      <Posts post={posts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
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
  activeTab: {
    color: theme.colors.primary,
  },
});

export default Profile;

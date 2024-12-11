import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Video } from "expo-av";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const VideoPlayerScreen = () => {
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const profileImage = "https://via.placeholder.com/150"; // Example placeholder
  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; // Example video
  const userName = "John Doe";
  const location = "San Francisco";
  const likes = 120;
  const postDescription =
    "something about the post that relates to exciting updates and information.";

  return (
    <View style={styles.container}>
      {loading ? (
        // Skeleton Loader
        <SkeletonPlaceholder>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.profileSkeleton} />
              <View style={styles.headerTextWrapper}>
                <View style={styles.titleSkeleton} />
                <View style={styles.subtitleSkeleton} />
              </View>
            </View>
            <View style={styles.imageSkeleton} />
            <View style={styles.socialIcons}>
              <View style={styles.iconPlaceholder} />
              <View style={styles.iconPlaceholder} />
              <View style={styles.iconPlaceholder} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        // Video player with UI components
        <View style={styles.card}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <Image source={{ uri: profileImage }} style={styles.profile} />
              </TouchableOpacity>
              <View style={styles.headerTextWrapper}>
                <TouchableOpacity>
                  <Text style={styles.title}>{userName}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subtitle}>
                    <Ionicons name="location-outline" size={12} color="#555" />
                    {location}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Video player */}
          <TouchableOpacity activeOpacity={0.8}>
            <Video
              source={{ uri: videoUrl }}
              style={styles.videoContent}
              resizeMode="contain"
              onLoad={() => setLoading(false)} // Remove loading on video load
              useNativeControls
            />
          </TouchableOpacity>

          {/* Social Media Interaction Section */}
          <View style={styles.socialIcons}>
            <TouchableOpacity
              onPress={handleLike}
              style={{ flexDirection: "row", gap: 5 }}
            >
              <Image
                source={
                  liked
                    ? require("./assets/success-1.png") // Replace with your active like image
                    : require("./assets/success.png") // Replace with your default like image
                }
                style={styles.iconImage}
              />
              <Text style={{ color: liked ? "blue" : "gray" }}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="comment-o" size={20} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="paper-plane" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Post Description */}
          <Text style={styles.subtitle}>{postDescription}</Text>
        </View>
      )}
    </View>
  );
};

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTextWrapper: {
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  videoContent: {
    flex: 1,
    height: 250,
    width: "100%",
    borderRadius: 10,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
});

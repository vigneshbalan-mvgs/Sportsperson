import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Video } from "expo-av";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Posts = ({ post }) => {
  // Filter data by type (image or video)
  const mediaItems =
    Array.isArray(post) && post.length > 0
      ? post.filter((p) => p.type === "image" || p.type === "video")
      : [];

  const [loaded, setLoaded] = useState({}); // Track loaded items

  const handleLoad = (index) => {
    setLoaded((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <FlatList
      data={mediaItems}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.postItem}
          onPress={() => {
            console.log("Media clicked:", item);
            router.push("/(insider)/profile/ProfilePosts");
          }}
        >
          {item.type === "image" ? (
            // Render Image with lazy loading
            <>
              {!loaded[index] && (
                <ActivityIndicator
                  style={StyleSheet.absoluteFill}
                  size="small"
                  color="#888"
                />
              )}
              <Image
                source={{ uri: item.URL }}
                style={styles.postImage}
                onLoad={() => handleLoad(index)}
              />
            </>
          ) : item.type === "video" ? (
            // Render Video with play button overlay
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: item.URL }}
                style={styles.postVideo}
                shouldPlay={false} // Play only when triggered
                isLooping={true} // Loop video
                resizeMode="cover"
              />
              <View style={styles.playButtonContainer}>
                <Text style={styles.playButton}>▶</Text>
              </View>
            </View>
          ) : (
            // Handle unsupported types (optional)
            <View style={styles.unsupportedMedia}>
              <Text>Unsupported Media</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      style={styles.postsGrid}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  postsGrid: {
    flex: 1,
    marginTop: 10,
  },
  postItem: {
    width: wp("33.3%"),
    height: wp("33.3%"),
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  postVideo: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  playButtonContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
  },
  playButton: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  unsupportedMedia: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
});

export default Posts;


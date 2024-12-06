import React from "react";
import { FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"; // Assuming this is imported in Profile.js

const Posts = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.postItem}>
          <Image source={{ uri: item }} style={styles.postImage} />
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
    marginTop: 10, // Optional: Add some margin if you want space above
  },
  postItem: {
    width: wp("33.3%"), // 33.3% width of the screen width
    height: wp("33.3%"), // 33.3% height of the screen width, making it a square
    padding: 5, // Optional: Padding inside each item
    justifyContent: "center", // Ensures the image stays centered
    alignItems: "center", // Ensures the image stays centered
  },
  postImage: {
    width: "100%", // Ensure the image fills the entire width
    height: "100%", // Ensure the image fills the entire height
    borderRadius: 10, // Rounded corners (optional)
    resizeMode: "cover", // Ensures the image covers the entire space without distortion
  },
});

export default Posts;

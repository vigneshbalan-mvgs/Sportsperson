import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import BackButton from "@components/back";

const NewsDetails = () => {
  const route = useRoute();
  const { data } = route.params || {};
  console.log(data);

  // Handle empty or undefined states
  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <BackButton />

      {/* Title */}
      <Text style={styles.title}>{data.title || "No Title Available"}</Text>

      {/* News Image */}
      <Image
        source={{ uri: data.urlToImage || "https://via.placeholder.com/150" }}
        style={styles.image}
      />

      {/* News Description */}
      <Text style={styles.description}>
        {data.description || "No description available."}
      </Text>

      {/* Content - Limit this to a snippet */}
      <Text style={styles.content}>
        {data?.content
          ? `${data.content.substring(0, 200)}...`
          : "No content available."}
      </Text>
    </ScrollView>
  );
};

export default NewsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
});

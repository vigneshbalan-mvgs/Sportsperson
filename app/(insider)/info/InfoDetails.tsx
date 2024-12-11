import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import BackButton from "@components/back"; // Assuming the BackButton component is correct

const NewsDetail = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <BackButton />

      {/* Image at the top */}
      <Image
        source={{ uri: "https://via.placeholder.com/150" }} // Replace with your image URL
        style={styles.image}
      />

      {/* News Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Breaking News: Major Event Happens!</Text>
        <Text style={styles.bodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod
          lorem nec nulla fermentum, sit amet vehicula lorem condimentum.
          Integer convallis, eros eget iaculis volutpat, libero lorem
          scelerisque turpis, sed tristique felis nisl sit amet arcu. Proin
          venenatis leo ut magna feugiat, ut elementum lorem faucibus.
        </Text>
        {/* Add more content as needed */}
      </View>
    </ScrollView>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});

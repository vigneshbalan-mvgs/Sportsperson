import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router"; // Assuming you're using Expo Router
import BackButton from "@components/back";

const NewsDetail = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch news data using fetch()
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=fc4341690ec946098f0f49298c887dc2",
        );
        const data = await response.json();
        setNewsData(data.articles);
      } catch (error) {
        console.error("Error fetching news: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Handle navigation to news details screen
  const handlePress = (newsItem) => {
    router.push({
      pathname: "/info/NewsDetail",
      params: { data: JSON.stringify(newsItem) },
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Back Button */}

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#000" />
      ) : (
        newsData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.newsItem}
            onPress={() => handlePress(item)}
          >
            <Image
              source={{
                uri: item.urlToImage || "https://via.placeholder.com/150",
              }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.bodyText}>
                {item.description || "No description available"}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    marginTop: 20,
  },
  newsItem: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  textContainer: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bodyText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

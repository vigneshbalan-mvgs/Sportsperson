import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Post from "@/components/Posts/Post";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "@/const/colors";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const PostMain = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [usedIds, setUsedIds] = useState(new Set());
  const [token, setToken] = useState(null); // Initializing as null

  // Fetch token from SecureStore and set it in state
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      setToken(storedToken); // Update token state
    };

    getToken();
  }, []);

  // Check if token is available, if not redirect to login
  useEffect(() => {
    if (token === null) return; // Only run this if token is not null

    if (!token) {
      router.replace("/login"); // Navigate to login if token is not available
    }
  }, [token]); // Only trigger this effect when token is updated

  const fetchPosts = async () => {
    if (!token) return; // Ensure token is loaded before fetching data
    console.log("token", token);

    try {
      const url = "http://147.79.68.157:4500/api/user/view";
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (data.status) {
        setPosts(data.posts);
        setUsedIds(new Set(data.posts.map((post) => post.postId)));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Reset state to start fresh
    setPosts([]);
    setUsedIds(new Set());
    setIsFetchingMore(false);
    fetchPosts().finally(() => setRefreshing(false));
  }, [token]);

  const loadMorePosts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      try {
        const url = `http://147.79.68.157:4500/api/user/view`;
        const response = await fetch(url, {
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status) {
          setPosts(data.posts);
          setUsedIds(
            (prevUsedIds) =>
              new Set([
                ...prevUsedIds,
                ...data.posts.map((post) => post.postId),
              ]),
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingMore(false);
      }
    }
  };

  // Fetch posts after the token is set
  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const renderPost = ({ item }) => (
    <GestureHandlerRootView>
      <Post post={item} />
    </GestureHandlerRootView>
  );

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ height: 200 }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={renderPost}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary, colors.secondary, colors.primary]}
          />
        }
      />
    </View>
  );
};

export default PostMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: wp(100),
    height: hp(100),
  },
});

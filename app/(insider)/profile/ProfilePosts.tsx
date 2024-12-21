import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
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
import { PORT } from "@/const/PORT";
import Video from "@components/Posts/Video";
import BackButton from "@components/back";

const API_URL = PORT + "/api/user/mypost";

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [usedIds, setUsedIds] = useState(new Set());
  const [token, setToken] = useState(undefined);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setToken(storedToken.replace(/^"|"$/g, ""));
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Token retrieval error:", error);
        router.replace("/login");
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token === undefined) return;
    if (!token) {
      router.replace("/login");
    } else {
      fetchPosts(true);
    }
  }, [token]);

  const fetchPosts = async (reset = false) => {
    if (!token) return;

    try {
      const currentPage = reset ? 1 : page;
      const response = await fetch(`${API_URL}?page=${currentPage}&&limit=5`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch posts");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setUsername(data.data.userName);

      if (data.status && data.data && Array.isArray(data.data.myPostKeys)) {
        const newPosts = data.data.myPostKeys.filter(
          (post) => !usedIds.has(post.postId)
        );

        if (newPosts.length > 0) {
          setPosts((prevPosts) =>
            reset ? newPosts : [...prevPosts, ...newPosts]
          );
          setUsedIds((prevIds) =>
            new Set([...prevIds, ...newPosts.map((post) => post.postId)])
          );
        }

        if (reset) {
          setPage(2);
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        Alert.alert("Error", data.message || "Unexpected API response.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert(
        "Error",
        error.message || "Unable to load posts. Please try again later."
      );
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    setUsedIds(new Set());
    setRefreshKey((prev) => prev + 1);
    fetchPosts(true).finally(() => setRefreshing(false));
  }, [fetchPosts]);

  const loadMorePosts = async () => {
    if (!isFetchingMore && token) {
      setIsFetchingMore(true);
      await fetchPosts();
      setIsFetchingMore(false);
    }
  };

  const renderPost = useMemo(
    () => ({ item }) => (
      <GestureHandlerRootView>
        {item.type === "image" ? <Post post={item} /> : <Video post={item} />}
      </GestureHandlerRootView>
    ),
    []
  );

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };

  return (

    <View style={styles.container}>
      <View style={{ width: wp(100), height: 80, alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <BackButton />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{username}</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderPost}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary, colors.secondary, colors.primary]}
          />
        }
        windowSize={15}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        key={refreshKey}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfilePosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: wp(100),
    height: hp(100),
  },
  footer: {
    paddingVertical: 20,
  },
});


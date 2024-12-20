import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  StyleSheet,
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
import Video from "./Video"

const API_URL = PORT + "/api/user/home";

const PostMain = () => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [usedIds, setUsedIds] = useState(new Set());
  const [token, setToken] = useState(undefined); // Undefined during initialization
  const [page, setPage] = useState(1); // For pagination
  const [refreshKey, setRefreshKey] = useState(0); // Key to force re-render
  const debounce = useRef(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          const sanitizedToken = storedToken.replace(/^"|"$/g, ""); // Clean the token
          setToken(sanitizedToken);
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to retrieve token", error);
        router.replace("/login");
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token === undefined) return; // Skip until token is initialized
    if (!token) {
      router.replace("/login");
    }
  }, [token]);
  const fetchPosts = async (reset = false) => {
    if (!token) return;

    try {
      const currentPage = reset ? 1 : page;
      const response = await fetch(`${API_URL}?page=${currentPage}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });


      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      if (data.status) {
        // Filter out duplicate posts before updating state
        const newPosts = data.posts.filter((post) => !usedIds.has(post.postId));

        if (newPosts.length > 0) {
          setPosts((prevPosts) =>
            reset ? newPosts : [...prevPosts, ...newPosts]
          );
          setUsedIds((prevIds) =>
            new Set([...prevIds, ...newPosts.map((post) => post.postId)])
          );
        }

        // Update page state
        if (reset) {
          setPage(1); // Set to the next page after reset
        } else {
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        Alert.alert("Error", data.message || "Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert(
        "Error",
        `${error.message} try to login again` ||
        "Unable to load posts. Please try again later."
      );
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1); // Reset page to 1
    setPosts([]);
    setUsedIds(new Set());
    setRefreshKey((prevKey) => prevKey + 1); // Force FlatList re-render
    fetchPosts(true).finally(() => setRefreshing(false));
  }, [fetchPosts]);

  const loadMorePosts = async () => {
    // Check for ongoing fetching or lack of token
    if (isFetchingMore || !token) return;

    // Start fetching more posts
    setIsFetchingMore(true);
    try {
      await fetchPosts(); // Fetch the next set of posts

      // Only increment page after posts are successfully fetched
      setPage((prevPage) => prevPage + 1); // Increment page number only if posts are fetched

    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsFetchingMore(false); // Reset fetching status
    }
  };



  useEffect(() => {
    if (token) {
      fetchPosts(true);
    }
  }, [token]);

  const renderPost = useMemo(() => {
    return ({ item }) => (
      <GestureHandlerRootView>
        {item.type === 'image' ? (
          <Post post={item} />
        ) : (
          <Video post={item} />
        )}
      </GestureHandlerRootView>
    );
  }, []);

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
      <FlatList
        windowSize={15} // This will render 10 items above and below the viewport, giving more breathing room.
        key={refreshKey} // Dynamic key for forcing re-render
        data={posts}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderPost}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary, colors.secondary, colors.primary]}
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={5}
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
  footer: {
    paddingVertical: 20,
  },
});

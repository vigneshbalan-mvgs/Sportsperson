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
import Video from "./Video"; // Assuming Video component handles play/pause logic

const API_URL = PORT + "/api/user/home";

const PostMain = () => {
  // State management
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [usedIds, setUsedIds] = useState(new Set());
  const [token, setToken] = useState(undefined);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [visibleVideoIndex, setVisibleVideoIndex] = useState(null);

  const debounce = useRef(false);

  // Fetch token and authenticate user
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setToken(storedToken.replace(/^"|"$/g, "")); // Clean token
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

  // Fetch posts
  const fetchPosts = async (reset = false) => {
    if (!token) return;

    try {
      const currentPage = reset ? 1 : page;
      const response = await fetch(`${API_URL}?page=${currentPage}&limit=5`, {
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
        const newPosts = data.posts.filter((post) => !usedIds.has(post.postId));

        if (newPosts.length > 0) {
          setPosts((prevPosts) =>
            reset ? newPosts : [...prevPosts, ...newPosts]
          );
          setUsedIds((prevIds) =>
            new Set([...prevIds, ...newPosts.map((post) => post.postId)])
          );
          setPage(reset ? 2 : page + 1); // Update page after each fetch
        }
      } else {
        Alert.alert("Error", data.message || "Failed to fetch posts.");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert("Error", error.message || "Unable to load posts.");
    }
  };
  const onRefresh = useCallback(() => {
    if (!token) return; // Ensure token is available
    setRefreshing(true);

    // Reset states and fetch new posts
    setPosts([]);
    setUsedIds(new Set());
    setPage(1);

    fetchPosts(true)
      .catch((error) => {
        console.error("Error refreshing posts:", error);
        Alert.alert("Error", error.message || "Unable to refresh posts.");
      })
      .finally(() => setRefreshing(false)); // Set refreshing to false after fetch
  }, [token, fetchPosts]);

  const loadMorePosts = async () => {
    console.log("isFetchingMore:", isFetchingMore); // Debugging
    if (isFetchingMore || !token) return;

    setIsFetchingMore(true);
    try {
      await fetchPosts();
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts(true);
    }
  }, [token]);

  // Render post component
  const renderPost = useMemo(() => {
    return ({ item, index }) => (
      <GestureHandlerRootView>
        {item.type === "image" ? (
          <Post post={item} />
        ) : (
          <Video
            post={item}
            isVisible={index === visibleVideoIndex}
          />
        )}
      </GestureHandlerRootView>
    );
  }, [visibleVideoIndex]);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  };

  // Track visible items for video autoplay
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const threshold = 1; // Visibility threshold
    const visibleItem = viewableItems.find(
      (item) =>
        item.isViewable &&
        item.index !== undefined &&
        item.item.type === "video"
    );

    setVisibleVideoIndex(
      visibleItem && visibleItem.index >= threshold ? visibleItem.index : null
    );
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        key={refreshKey}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderPost}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary, colors.secondary]}
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default PostMain;

// Styles
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


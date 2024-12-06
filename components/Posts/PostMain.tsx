import React, { useState, useCallback } from "react";
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

const staticData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  postType: "post",
  userId: index + 1,
  title: `Post Title ${index + 1}`,
  profileImage: require("../../assets/images/contnet.jpg"),
  postDescription: `postDescription ${index + 1} `,
  userName: `User ${index + 1}`,
  likes: Math.floor(Math.random() * 1000),
  location: `Location ${index + 1}`,
  imageUrl: require("../../assets/images/content1.jpg"),
}));

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PostMain = () => {
  const POSTS_PER_PAGE = 2;
  const [posts, setPosts] = useState(
    shuffleArray(staticData).slice(0, POSTS_PER_PAGE),
  );

  const [refreshing, setRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [usedIds, setUsedIds] = useState(new Set(posts.map((post) => post.id))); // Track used IDs

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const shuffledPosts = shuffleArray(staticData).slice(0, POSTS_PER_PAGE);
      setPosts(shuffledPosts);
      setUsedIds(new Set(shuffledPosts.map((post) => post.id))); // Reset used IDs
      setRefreshing(false);
    }, 1000);
  }, []);

  const loadMorePosts = () => {
    if (!isFetchingMore && posts.length < staticData.length) {
      setIsFetchingMore(true);
      setTimeout(() => {
        const remainingPosts = staticData.filter(
          (post) => !usedIds.has(post.id),
        );
        const newPosts = shuffleArray(remainingPosts).slice(0, POSTS_PER_PAGE);
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        // Update usedIds state correctly by adding new IDs
        setUsedIds((prevUsedIds) => {
          const newIds = new Set(prevUsedIds);
          newPosts.forEach((post) => newIds.add(post.id));
          return newIds;
        });
        setIsFetchingMore(false);
      }, 750);
    }
  };

  const renderPost = ({ item }) => (
    <GestureHandlerRootView>
      <Post post={item} />
    </GestureHandlerRootView>
  );

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
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

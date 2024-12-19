import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { router } from "expo-router";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { br, colors } from "@/const/colors";
import constStyles from "@/const/Styles";
import CommentSectionOverlay from "./Comments";

const Post = ({ post }) => {
  const {
    postId = post.postId || "123",
    profileImage = post.userProfile || "https://via.placeholder.com/150",
    userName = post.userName || "Anonymous",
    location = post.location || "No location provided",
    imageUrl = { uri: post.URL[0] || "https://via.placeholder.com/400" },
    postDescription = post.description || "No description provided",
    type = post.type,
    likes = post.likes?.length || 0,
    comments = post.comments || [],
  } = post;

  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const animationOpacity = useRef(new Animated.Value(0)).current;  // Heart animation opacity
  const scaleValue = useRef(new Animated.Value(0)).current; // Heart scale animation
  const [isCommentOverlayVisible, setCommentOverlayVisible] = useState(false);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };

  const doubleTap = () => {
    setDoubleTapCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount === 2) {
        handleLike();
        triggerAnimation();
        clearTimeout(timer);
        return 0;
      }
      const newTimer = setTimeout(() => {
        setDoubleTapCount(0);
      }, 500);
      setTimer(newTimer);
      return newCount;
    });
  };

  const triggerAnimation = () => {
    Animated.sequence([
      Animated.timing(animationOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };



  if (!post) {
    return <Text>No content available</Text>;
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonPlaceholder>
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.profileSkeleton} />
              <View style={styles.headerTextWrapper}>
                <View style={styles.titleSkeleton} />
                <View style={styles.subtitleSkeleton} />
              </View>
            </View>
            <View style={styles.imageSkeleton} />
            <View style={styles.socialIcons}>
              <View style={styles.iconPlaceholder} />
              <View style={styles.iconPlaceholder} />
              <View style={styles.iconPlaceholder} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <View style={constStyles.card}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <Image source={{ uri: profileImage }} style={styles.profile} />
              </TouchableOpacity>
              <View style={styles.headerTextWrapper}>
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(insider)/profile/ProfileOthers")
                  }
                >
                  <Text style={styles.title}>{userName}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.subtitle}>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color={colors.secondary}
                    />
                    {location}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={doubleTap} activeOpacity={0.8}>
            <Image
              source={imageUrl}
              style={styles.imageContent}
              resizeMode="cover"
            />
            <Animated.View
              style={[
                styles.likeAnimation,
                { opacity: animationOpacity },
              ]}
            >
              {/* <Image */}
              {/*   style={{ resizeMode: "contain", width: 60, height: 60, }} */}
              {/*   source={ */}
              {/*     liked */}
              {/*       ? require("../../assets/icons/success-1.png") */}
              {/*       : require("../../assets/icons/success.png") */}
              {/*   } */}
              {/* /> */}
              <AntDesign name="heart" size={50} color={colors.primary} />
            </Animated.View>

          </TouchableOpacity>
          <View>
            <View style={styles.socialIcons}>
              <TouchableOpacity
                onPress={handleLike}
                style={{ flexDirection: "row", gap: 5 }}
              >
                <Image
                  source={
                    liked
                      ? require("../../assets/icons/success-1.png")
                      : require("../../assets/icons/success.png")
                  }
                />
                <Text
                  style={{ color: liked ? colors.primary : colors.secondary }}
                >
                  {likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCommentOverlayVisible(true)}>
                <FontAwesome
                  name="comment-o"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="paper-plane"
                  size={20}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle} numberOfLines={2}>
              {postDescription}
            </Text>
          </View>

          {/* Animated Heart Icon */}
        </View>
      )}

      {/* Comment Section Overlay */}
      <CommentSectionOverlay
        isVisible={isCommentOverlayVisible}
        onClose={() => setCommentOverlayVisible(false)}
        data={comments}
        postId={postId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  card: {
    width: wp(98),
    backgroundColor: "#fff",
    padding: 1,
    borderRadius: br.card,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTextWrapper: {
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#07001f",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
  },
  imageContent: {
    width: "100%",
    height: hp(30),
    borderRadius: 12,
  },
  content: {
    alignItems: "center",
  },
  likeAnimation: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -32 }, { translateY: -32 }],
  },

  socialIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  profileSkeleton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
  },
  titleSkeleton: {
    width: 100,
    height: 12,
    backgroundColor: "#e0e0e0",
    marginBottom: 5,
  },
  subtitleSkeleton: {
    width: 60,
    height: 12,
    backgroundColor: "#e0e0e0",
  },
  imageSkeleton: {
    width: wp(98),
    height: hp(30),
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  heartIcon: {
    position: "absolute",
    top: "35%",
    left: "35%",
    zIndex: 1,
  },
});

export default Post;


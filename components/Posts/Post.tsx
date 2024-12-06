import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { router } from "expo-router";
import {
  AntDesign,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { br, colors } from "@/const/colors";
import constStyles from "@/const/Styles";
import TextInput from "@components/TextInput";
import Button from "@components/Button";

// Refactor Post to use default parameters
const Post = ({ post = {} }) => {
  const {
    profileImage = require("../../assets/images/content1.jpg"),
    userName = "Anonymous",
    location = "Unknown",
    imageUrl = "https://via.placeholder.com/400",
    postDescription = "No description provided",
    likes = 0,
  } = post;

  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const animationOpacity = useRef(new Animated.Value(0)).current;

  const [isCommentOverlayVisible, setCommentOverlayVisible] = useState(false);

  //fetch

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulating loading time
    return () => clearTimeout(timer);
  }, []);

  //Onpress events

  const handleLike = () => {
    setLiked(!liked);
  };
  const doubleTap = () => {
    setDoubleTapCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 2) {
        // Handle double-tap logic
        handleLike();
        triggerAnimation(); // Show the animation
        clearTimeout(timer); // Clear the timer if double-tap is detected
        return 0; // Reset the count
      }

      // Set a timer for resetting the count after 500ms (or your preferred timeout)
      const newTimer = setTimeout(() => {
        setDoubleTapCount(0); // Reset count if the second tap doesn't happen in time
      }, 500); // 500ms time window for double tap

      setTimer(newTimer); // Save the timer reference

      return newCount;
    });
  };

  //animation

  const triggerAnimation = () => {
    console.log("passed");
    // Reset opacity to 1, then fade out
    Animated.sequence([
      Animated.timing(animationOpacity, {
        toValue: 1,
        duration: 200, // Fade-in duration
        useNativeDriver: true,
      }),
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 800, // Fade-out duration
        useNativeDriver: true,
      }),
    ]).start();
  };

  //not available

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
                <Image source={profileImage} style={styles.profile} />
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
            <Text style={styles.subtitle}>
              something about the post that realted to that something about the
              post that realted to that something about the post that realted to
              the post that realted to that {postDescription}
            </Text>
          </View>
        </View>
      )}
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
});

export default Post;

const CommentSectionOverlay = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={overlayStyles.overlayContainer}>
        <View style={overlayStyles.overlayContent}>
          <Text style={overlayStyles.title}>Comments</Text>
          <ScrollView>
            {/* Render existing comments here */}
            <Text style={overlayStyles.comment}>User1: Great post!</Text>
            <Text style={overlayStyles.comment}>User2: Amazing picture!</Text>
          </ScrollView>
          <TextInput
            style={overlayStyles.input}
            placeholder="Write a comment..."
          />
          <Button
            title="Post Comment"
            onPress={() => console.log("Comment posted")}
          />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const overlayStyles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    marginVertical: 5,
    fontSize: 14,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

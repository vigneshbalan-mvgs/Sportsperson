import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Modal,
  Dimensions,
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
import { colors, br } from "@/const/colors";
import CommentSectionOverlay from "./Comments";
import { Video } from "expo-av";
import BackButton from "@components/back";
import RightIcon from "@components/RightIcon";

const VideoPost = ({ post }) => {
  const {
    postId = post.postId || "123",
    profileImage = post.userProfile || "https://via.placeholder.com/150",
    userName = post.userName || "Anonymous",
    location = post.location || "No location provided",
    videoUrl = post.URL[0] || "https://via.placeholder.com/video.mp4",
    postDescription = post.description || "No description provided",
    likes = post.likes?.length || 0,
    comments = post.comments || [],
  } = post;

  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [doubleTapCount, setDoubleTapCount] = useState(0);
  const [timer, setTimer] = useState(null);
  const animationOpacity = useRef(new Animated.Value(0)).current;
  const [isCommentOverlayVisible, setCommentOverlayVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);
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

  const singleTap = () => {
    setModalVisible(true);
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
            {/* Skeleton placeholders */}
          </View>
        </SkeletonPlaceholder>
      ) : (
        <View style={styles.card}>
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
          <TouchableOpacity
            onPress={doubleTap}
            onLongPress={singleTap}
            activeOpacity={0.8}
          >
            <View>
              <Video
                source={{ uri: videoUrl }}
                style={styles.videoContent}
                isMuted={false}
                shouldPlay={false}
                useNativeControls
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
                <AntDesign name="heart" size={50} color={liked ? colors.primary : colors.secondary} />
              </Animated.View>
            </View>
          </TouchableOpacity>
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
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <RightIcon icon="back" onPress={() => setModalVisible(false)} />
          <Video
            source={{ uri: videoUrl }}
            style={styles.fullScreenVideo}
            isMuted={false}
            useNativeControls
            isLooping
          />
        </View>
      </Modal>

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
    padding: 10,
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
  videoContent: {
    width: "100%",
    height: "auto",
    aspectRatio: 1 / 2,
    borderRadius: 12,
  },
  socialIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  likeAnimation: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -32 }, { translateY: -32 }],
  },
  modalContent: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",

  },
  fullScreenVideo: {
    width: Dimensions.get("window").width - 10,
    height: Dimensions.get("window").height - 10,
  },
  closeButton: {
    position: "absolute",
    backgroundColor: "white",
    top: 10,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default VideoPost;


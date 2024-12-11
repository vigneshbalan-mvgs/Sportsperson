import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import constStyles from "@/const/Styles";

const { width, height } = Dimensions.get("window");

const VideoPlayerContainer = ({
  videoUrl = "https://ruthraa.com/assets/videos/Dashboard_Video.mp4",
  profileImage = "https://via.placeholder.com/150",
  userName = "user123",
  location = " Location",
  likes = 1230,
  description = "No description provided",
}) => {
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayPause, setShowPlayPause] = useState(true);
  const videoPlayerRef = useRef(null);
  const inactivityTimer = useRef(null);

  const handleLike = () => {
    setLiked(!liked);
  };

  const toggleMute = () => {
    setIsMuted((prevState) => {
      if (videoPlayerRef?.current) {
        videoPlayerRef.current.setIsMutedAsync(!prevState);
      }
      return !prevState;
    });
  };

  const togglePlayPause = () => {
    setIsPlaying((prevState) => {
      if (videoPlayerRef?.current) {
        prevState
          ? videoPlayerRef.current.pauseAsync()
          : videoPlayerRef.current.playAsync();
      }
      resetInactivityTimer();
      return !prevState;
    });
  };

  const handleUserInteraction = () => {
    setShowPlayPause(true);
    resetInactivityTimer();
  };

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      setShowPlayPause(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  return (
    <View style={styles.container} onTouchStart={handleUserInteraction}>
      {/* Full-Screen Video Player */}

      {/* User Info Section */}
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userLocation}>
              <Ionicons name="location-outline" size={14} color="#555" />
              {location}
            </Text>
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
      <View style={styles.videoWrapper}>
        <Video
          ref={videoPlayerRef}
          source={require("../../assets/video.mp4")}
          style={styles.videoStyle}
          shouldPlay={isPlaying}
          isLooping
          muted={isMuted}
        />

        {/* Play/Pause Button */}
        {showPlayPause && (
          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}
          >
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={50}
              color="white"
            />
          </TouchableOpacity>
        )}

        {/* Mute/Unmute Button */}
        <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
          <Ionicons
            name={isMuted ? "volume-mute" : "volume-high"}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Interaction Section */}
      <View style={styles.interactionBar}>
        <TouchableOpacity onPress={handleLike} style={styles.iconWrapper}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={30}
            color={liked ? "red" : "gray"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <FontAwesome name="comment-o" size={30} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconWrapper}>
          <Ionicons name="paper-plane" size={30} color="gray" />
        </TouchableOpacity>
        <Text style={styles.likesCounter}>{likes} Likes</Text>
        {/* Description Section */}
        <View style={styles.description}>
          <Text style={styles.postDescription}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default VideoPlayerContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  videoWrapper: {
    width: "100%",
    height: "50%",
    position: "relative",
    justifyContent: "center",
    overflow: "hidden",
  },
  videoStyle: {
    width: "100%",
    height: "100%",
    minHeight: 300,
    minWidth: 300,
    maxWidth: wp(99),
    alignSelf: "center",
  },
  playPauseButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 10,
  },
  muteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userLocation: {
    fontSize: 14,
    color: "gray",
  },
  interactionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#d0d0d0",
  },
  iconWrapper: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  likesCounter: {
    fontSize: 14,
    color: "gray",
    marginLeft: 8,
  },
  description: {
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  postDescription: {
    fontSize: 14,
    color: "#555",
  },
});

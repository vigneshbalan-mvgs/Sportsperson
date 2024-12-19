import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Animated, Image } from "react-native";
import { Video } from "expo-av";
import { AntDesign, FontAwesome } from "@expo/vector-icons";  // Added FontAwesome for more icons
import { colors } from "@/const/colors";

const VideoPlayer = ({ videoUrl, likes, liked, onLike, onDoubleTap }) => {
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const [animationOpacity] = useState(new Animated.Value(0));
  const [isLiked, setIsLiked] = useState(liked); // Local liked state to handle double-tap
  const [isPlaying, setIsPlaying] = useState(false); // Track if video is playing
  const [isMuted, setIsMuted] = useState(false); // Track mute state
  const videoRef = useRef(null); // Reference to the Video component

  const onVideoLoad = (status) => {
    const { naturalSize } = status;
    setVideoDimensions(naturalSize); // Store video dimensions in state
  };

  // Handle double tap detection for Instagram-like effect
  const doubleTapTimeout = useRef(null);
  const [tapCount, setTapCount] = useState(0);

  const handleTap = () => {
    setTapCount(prev => prev + 1);

    if (tapCount === 1) {
      doubleTapTimeout.current = setTimeout(() => setTapCount(0), 300);
    }

    if (tapCount === 1) {
      onDoubleTap(); // Trigger the callback for double-tap
      triggerAnimation();
      setIsLiked(!isLiked); // Toggle like state
      onLike(); // Call the external onLike function if needed
    }
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

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync(); // Pause the video
    } else {
      videoRef.current.playAsync(); // Play the video
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.setIsMutedAsync(!isMuted); // Mute/unmute the video
    setIsMuted(!isMuted);
  };

  return (
    <View>
      <View>
        <TouchableWithoutFeedback onPress={handleTap}>
          <View>
            <Video
              ref={videoRef}
              source={{ uri: videoUrl }}
              style={[styles.videoContent]}
              isMuted={isMuted}
              shouldPlay={isPlaying} // Removed auto-play, now requires user interaction to play
              onLoad={onVideoLoad}
            />
            <Animated.View style={[styles.likeAnimation, { opacity: animationOpacity }]}>
              <AntDesign name="heart" size={50} color={isLiked ? colors.primary : colors.secondary} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* Overlay with Play/Pause and Mute buttons */}
      <View style={styles.overlay}>
        <TouchableOpacity onPress={handlePlayPause} style={styles.playPauseButton}>
          <AntDesign name={isPlaying ? "pause" : "play"} size={60} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMute} style={styles.muteButton}>
          <AntDesign name={isMuted ? "soundmute" : "sound"} size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Like button */}
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={onLike} style={{ flexDirection: "row", gap: 5 }}>
          <Image
            source={
              isLiked
                ? require("../../assets/icons/success-1.png")
                : require("../../assets/icons/success.png")
            }
          />
          <Text style={{ color: isLiked ? colors.primary : colors.secondary }}>
            {likes}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Additional Icons */}
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={() => console.log("Share pressed")}>
          <FontAwesome name="share" size={30} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Save pressed")}>
          <AntDesign name="save" size={30} color={colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContent: {
    width: "100%", // Full width of the container
    borderRadius: 12,
    aspectRatio: 1 / 1,
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
    marginTop: 10,
    gap: 10,
  },
  overlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -35 }, { translateY: -35 }],
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  playPauseButton: {
    margin: 10,
  },
  muteButton: {
    margin: 10,
  },
});

export default VideoPlayer;


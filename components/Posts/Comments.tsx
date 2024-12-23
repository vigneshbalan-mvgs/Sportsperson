import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Animated,
  FlatList,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "@/const/colors";
import TextInputComponent from "@components/TextInput";
import * as SecureStore from "expo-secure-store";
import Button from "@/components/Button";
import { AntDesign } from "@expo/vector-icons";

const CommentSectionOverlay = ({ isVisible, onClose, postId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen toggle
  const slideAnim = useRef(new Animated.Value(1000)).current; // For animation

  useEffect(() => {
    if (isVisible) {
      openOverlay();
      fetchComments();
    } else {
      closeOverlay();
    }
  }, [isVisible]);

  const openOverlay = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeOverlay = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const fetchComments = async () => {
    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, ""); // Removes leading and trailing quotes
    try {
      const url = `https://sportspersonz.com/api/user/comment/${postId}/view`;
      const options = {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.status) {
        setComments(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (commentInput.trim() === "") return;
    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, "");

    setLoading(true);
    const url = `https://sportspersonz.com/api/user/comment/${postId}`;
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ comment: commentInput }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.success) {
        setCommentInput("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      fetchComments();
      setCommentInput("");
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const url = `https://sportspersonz.com/api/user/comment/${commentId}`;
    const options = {
      method: "DELETE",
      headers: {
        authorization: "Bearer YOUR_BEARER_TOKEN",
        "content-type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.success) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderItem = ({ item }) => (
    <View style={overlayStyles.commentContainer}>
      <Image
        source={{ uri: item.Img || "https://placehold.co/40x40" }}
        style={overlayStyles.avatar}
      />
      <View style={overlayStyles.commentContent}>
        <Text style={overlayStyles.username}>{item.username || "Unknown"}</Text>
        <Text style={overlayStyles.commentText}>{item.comment}</Text>
        <Text style={overlayStyles.commentDate}>
          {formatDate(item.createdAt)}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeOverlay}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={overlayStyles.overlayContainer}>
          <Animated.View
            style={[
              overlayStyles.overlayContent,
              {
                transform: [{ translateY: slideAnim }],
                height: isFullscreen ? "100%" : "50%", // Fullscreen mode toggle
              },
            ]}
          >
            {/* Close Button */}
            <View style={overlayStyles.closeButtonContainer}>
              <TouchableOpacity
                style={overlayStyles.closeButton}
                onPress={() => setIsFullscreen((prev) => !prev)}
              >
                <AntDesign name="upload" size={24} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={overlayStyles.closeButton}
                onPress={closeOverlay}
              >
                <AntDesign name="close" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>


            <Text style={overlayStyles.title}>Comments</Text>

            <FlatList
              data={comments}
              renderItem={renderItem}
              keyExtractor={(item) => item._id.toString()}
              style={overlayStyles.scrollContainer}
              ListEmptyComponent={<Text style={overlayStyles.comment}>No comments yet</Text>}
            />

            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={overlayStyles.commentInputContainer}
              ><View style={overlayStyles.commentInput}>
                  <TextInputComponent
                    placeholder="Write a comment..."
                    value={commentInput}
                    onChangeText={setCommentInput}
                    style={{ flex: 1, paddingRight: 10 }}
                  />

                  <TouchableOpacity
                    onPress={handlePostComment}
                    disabled={loading}
                  >
                    <AntDesign name="arrowup" size={24} color={colors.primary} /></TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            )}

            {/* Fullscreen Toggle Button */}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const overlayStyles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  overlayContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "flex-start",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    gap: 10,
    flexDirection: "row",
  },
  closeButton: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    width: "100%",
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flexDirection: "column",
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 3,
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
  },
  commentInput: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.background,
  },
  commentInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fullscreenButton: {
    bottom: 10,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 20,
  },
  fullscreenText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CommentSectionOverlay;


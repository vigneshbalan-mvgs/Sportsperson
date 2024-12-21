import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  PanResponder,
  ActivityIndicator,
  Animated,
  StatusBar,
} from "react-native";
import { colors } from "@/const/colors";
import TextInputComponent from "@components/TextInput";
import * as SecureStore from "expo-secure-store";
import Button from "@/components/Button"

const CommentSectionOverlay = ({ isVisible, onClose, postId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(1000)).current; // Start off-screen


  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 100) {
        closeOverlay(); // Close the modal when the user swipes down by 100 pixels
      }
    },
    onPanResponderRelease: () => { },
  });

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
      if (data.success) {
        setComments(data.data || []); // Assuming `data.comments` contains the comment list
        console.log(comments)
        console.log(postId);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (commentInput.trim() === "") return; // Prevent posting empty comments
    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, ""); // Removes leading and trailing quotes


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
      console.log(data)
      if (data.success) {
        setComments([
          ...comments,
          { comment: commentInput, createdAt: new Date() },
        ]);
        setCommentInput(""); // Clear input after posting
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
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
      body: JSON.stringify({ commentBy: ["YOUR_USER_ID"] }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.success) {
        setComments(comments.filter((comment) => comment.id !== commentId)); // Remove deleted comment from UI
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

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeOverlay}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeOverlay}>
        <View style={overlayStyles.overlayContainer}>
          <Animated.View
            style={[
              overlayStyles.overlayContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
            {...panResponder.panHandlers}
          >
            <Text style={overlayStyles.title}>Comments</Text>
            <ScrollView style={overlayStyles.scrollContainer}>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <View key={comment._id} style={overlayStyles.commentContainer}>
                    <Image
                      source={{ uri: comment.Img || "https://placehold.co/40x40" }} // Fallback for missing images
                      style={overlayStyles.avatar}
                    />
                    <View style={overlayStyles.commentContent}>
                      <Text style={overlayStyles.username}>{comment.username || "Unknown"}</Text>
                      <Text style={overlayStyles.commentText}>{comment.comment}</Text>
                      <Text style={overlayStyles.commentDate}>
                        {formatDate(comment.createdAt)}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={overlayStyles.comment}>No comments yet</Text>
              )}
            </ScrollView>

            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <View style={overlayStyles.commentInputContainer}>
                <TextInputComponent
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChangeText={setCommentInput}
                  style={{ flex: 1, paddingRight: 10 }}
                />
                <Button
                  title="Post"
                  type="primaryAuto"
                  onPress={handlePostComment}
                  disabled={loading}
                />
              </View>
            )}

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
    height: "50%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "flex-start",
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
  commentInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CommentSectionOverlay;


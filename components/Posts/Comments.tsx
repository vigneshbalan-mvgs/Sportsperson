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
import Button from "@components/Button";
import TextInputComponent from "@components/TextInput";

const CommentSectionOverlay = ({ isVisible, onClose, data, postId }) => {
  const [comments, setComments] = useState(data || []);
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
    onPanResponderRelease: () => {},
  });

  useEffect(() => {
    if (isVisible) {
      openOverlay();
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
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.6)");
  };

  const closeOverlay = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("#fff");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handlePostComment = async () => {
    if (commentInput.trim() === "") return; // Prevent posting empty comments

    setLoading(true);
    const url = `http://147.79.68.157:4500/api/user/comment/${postId}`;
    const options = {
      method: "POST",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWM1ZGY3MWQ0YWE5MmFhNjZlOGU5NiIsInV1aWQiOiJWbXpJc2xfSkdwWGNrbHotdm5sekIiLCJFbWFpbF9JRCI6InZpZ25lc2hiYWxhbm12Z3MyMDAzQGdtYWlsLmNvbSIsImlhdCI6MTczNDEwNjY0MSwiZXhwIjoxNzM0MTkzMDQxfQ.6jp-Z6NfXOrZqTvdS1pBvD1Av3IZXW4s_dLh69reHt4",
        "content-type": "application/json",
      },
      body: JSON.stringify({ comment: commentInput }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
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

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeOverlay}
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
                comments.map((comment, index) => (
                  <View key={index} style={overlayStyles.commentContainer}>
                    <Image
                      source={{
                        uri: comment.commentProfile,
                      }}
                      style={overlayStyles.avatar}
                    />
                    <View style={overlayStyles.commentContent}>
                      <Text style={overlayStyles.username}>
                        {comment.commentBy}
                      </Text>
                      <Text style={overlayStyles.commentText}>
                        {comment.comment}
                      </Text>
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

            {loading && (
              <ActivityIndicator size="large" color={colors.primary} />
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
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay
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
    marginTop: 10,
  },
});

export default CommentSectionOverlay;

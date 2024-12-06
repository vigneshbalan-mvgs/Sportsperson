import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const dummyComments = [
  {
    id: "1",
    profile: "https://via.placeholder.com/50",
    username: "JohnDoe",
    comment: "This is an awesome post!",
    time: "5m ago",
  },
  {
    id: "2",
    profile: "https://via.placeholder.com/50",
    username: "JaneSmith",
    comment: "I totally agree with your point.",
    time: "10m ago",
  },
  {
    id: "3",
    profile: "https://via.placeholder.com/50",
    username: "RandomUser123",
    comment: "Can you elaborate on this?",
    time: "15m ago",
  },
  {
    id: "4",
    profile: "https://via.placeholder.com/50",
    username: "TechGuru",
    comment: "Thanks for sharing this!",
    time: "20m ago",
  },
];

const CommentSectionOverlay = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const openMenu = (comment) => {
    setSelectedComment(comment);
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedComment(null);
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      {/* Profile Picture */}
      <Image source={{ uri: item.profile }} style={styles.profileImage} />

      {/* Comment Content */}
      <View style={styles.commentContent}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.commentText}>{item.comment}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {/* 3-dot Menu */}
      <TouchableOpacity
        onPress={() => openMenu(item)}
        style={styles.moreButton}
      >
        <MaterialIcons name="more-vert" size={24} color="#555" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Comment List */}
      <FlatList
        data={dummyComments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.commentsList}
      />

      {/* Modal for 3-dot menu actions */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.overlay} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            <Text style={styles.menuOption}>Report Comment</Text>
            <Text style={styles.menuOption}>Block User</Text>
            <Text style={styles.menuOption}>Cancel</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  commentsList: {
    paddingBottom: 20,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  moreButton: {
    padding: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  menuOption: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 10,
    textAlign: "center",
  },
});

export default CommentSectionOverlay;

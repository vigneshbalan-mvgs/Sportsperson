import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const CustomModal = ({ visible, onClose, children }) => {
  const [animationValue] = useState(new Animated.Value(0)); // Initial value for slide animation

  // Trigger slide-in animation when visibility changes
  useEffect(() => {
    if (visible) {
      // Slide up the modal
      Animated.spring(animationValue, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down the modal
      Animated.spring(animationValue, {
        toValue: 0,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const slideInStyle = {
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0], // Starts from 300px below the screen and slides to 0 (bottom of screen)
        }),
      },
    ],
    opacity: animationValue, // Fade in effect for smoother transition
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.modalContainer, slideInStyle]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end", // Align modal to bottom
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  modalContainer: {
    width: "100%", // Make modal width full width
    backgroundColor: "#fff",
    borderTopLeftRadius: 20, // Rounded top corners
    borderTopRightRadius: 20, // Rounded top corners
    padding: 20,
    position: "absolute",
    bottom: 0, // Always at the bottom
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#07001f",
    padding: 8,
    borderRadius: 20,
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
  },
  content: {
    marginTop: 20, // Some space between content and close button
  },
});

export default CustomModal;

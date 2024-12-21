import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  TextInput,
  Button as RNButton,
} from "react-native";
import { colors } from "@/const/colors";
import * as SecureStore from "expo-secure-store";

const Options = ({ isVisible, onClose, postId, postUserUuid }) => {
  const [loading, setLoading] = useState(false);
  const [currentUserUuid, setCurrentUserUuid] = useState(null);
  const [reporting, setReporting] = useState(false); // Track if report option is selected
  const [reportReason, setReportReason] = useState(""); // Store the report reason
  const slideAnim = useRef(new Animated.Value(1000)).current; // Start off-screen

  useEffect(() => {
    if (isVisible) {
      openOverlay();
      fetchCurrentUserUuid();
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

  // Fetch current user UUID from SecureStore
  const fetchCurrentUserUuid = async () => {
    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, ""); // Removes leading and trailing quotes

    try {

      const data = await SecureStore.getItemAsync("Uuid");
      setCurrentUserUuid(data); // Assuming UUID is stored in data.uuid
      console.log(data)
    }
    catch (error) {
      console.error("Error fetching user UUID:", error);
    }
    finally {
      setLoading(false);

    }
  }

  const handleDeletePost = async () => {
    if (!currentUserUuid) return; // Prevent if current user UUID is not available

    setLoading(true);
    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, ""); // Removes leading and trailing quotes

    const url = `https://sportspersonz.com/api/user/delete/${postId}`;
    const options = {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.success) {
        console.log("Post deleted successfully");
        onClose(); // Close the modal after deleting the post
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReportPost = async () => {
    if (!reportReason.trim()) return; // Prevent submitting empty reports

    setLoading(true);
    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, ""); // Removes leading and trailing quotes

    const url = `https://sportspersonz.com/api/user/report/${postId}`;
    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ reason: reportReason }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.success) {
        console.log("Post reported successfully");
        onClose(); // Close the modal after reporting the post
      } else {
        console.error("Failed to report post");
      }
    } catch (error) {
      console.error("Error reporting post:", error);
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
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeOverlay}>
        <View style={overlayStyles.overlayContainer}>
          <Animated.View
            style={[
              overlayStyles.overlayContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={overlayStyles.card}>
              {/* If in Reporting mode, show the report reason input */}
              {reporting ? (
                <>
                  <Text style={overlayStyles.label}>Report Reason</Text>
                  <TextInput
                    style={overlayStyles.input}
                    placeholder="Enter reason for reporting"
                    value={reportReason}
                    onChangeText={setReportReason}
                  />
                  {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                  ) : (
                    <RNButton title="Submit Report" onPress={handleReportPost} />
                  )}
                  <RNButton
                    title="Cancel"
                    onPress={() => setReporting(false)} // Go back to the options screen

                  />
                </>
              ) : (
                <>
                  {/* Show Delete button if current user is the post owner */}
                  {currentUserUuid === postUserUuid && (
                    <>
                      {loading ? (
                        <ActivityIndicator size="large" color={colors.primary} />
                      ) : (
                        <RNButton title="Delete Post" onPress={handleDeletePost} />
                      )}
                    </>
                  )}

                  {/* Report button */}
                  <RNButton
                    title="Report Post"
                    onPress={() => setReporting(true)} // Switch to reporting mode
                  />
                </>
              )}
            </View>
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
    height: "100%", // Fullscreen height
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
  },
  overlayContent: {
    width: "100%", // Full width
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "90%", // Set the card width to 90% of the screen
    maxWidth: 400, // Limit the card size for larger screens
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default Options;


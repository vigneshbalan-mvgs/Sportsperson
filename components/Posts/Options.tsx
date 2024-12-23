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
} from "react-native";
import { colors } from "@/const/colors";
import * as SecureStore from "expo-secure-store";
import Button from "@/components/Button";

const Options = ({ isVisible, onClose, postId, postUserUuid }) => {
  const [loading, setLoading] = useState(false);
  const [currentUserUuid, setCurrentUserUuid] = useState("");
  const [reporting, setReporting] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const slideAnim = useRef(new Animated.Value(1000)).current;

  console.log(isVisible, onClose, postId, postUserUuid);

  useEffect(() => {
    if (isVisible) {
      openOverlay();
      fetchCurrentUserUuid();
    } else {
      closeOverlay();
      resetStates();
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

  const resetStates = () => {
    setLoading(false);
    setReporting(false);
    setReportReason("");
  };

  const fetchCurrentUserUuid = async () => {
    try {
      const data = await SecureStore.getItemAsync("Uuid");
      setCurrentUserUuid(data);
      console.log("Fetched UUID:", data);
    } catch (error) {
      console.error("Error fetching user UUID:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!currentUserUuid) return console.error("User UUID not available");

    setLoading(true);
    try {
      const token = (await SecureStore.getItemAsync("token"))?.replace(/^"|"$/g, "");
      const response = await fetch(`https://sportspersonz.com/api/user/delete/${postId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        console.log("Post deleted successfully");
        onClose();
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
    if (!reportReason.trim()) return console.error("Please enter a reason for reporting");

    setLoading(true);
    try {
      const token = (await SecureStore.getItemAsync("token"))?.replace(/^"|"$/g, "");
      const response = await fetch(`https://sportspersonz.com/api/user/report/${postId}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ reason: reportReason }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Post reported successfully");
        onClose();
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
      transparent
      visible={isVisible}
      onRequestClose={closeOverlay}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeOverlay}>
        <View style={styles.overlayContainer}>
          <Animated.View style={[styles.overlayContent, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.card}>
              {currentUserUuid === postUserUuid ? ( // Owner can delete
                loading ? (
                  <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                  <Button title="Delete Post" type="primaryAuto" onPress={handleDeletePost} />
                )
              ) : reporting ? ( // Non-owner can report
                <>
                  <Text style={styles.label}>Report Reason</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter reason for reporting"
                    value={reportReason}
                    onChangeText={setReportReason}
                  />
                  {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                  ) : (
                    <Button title="Submit Report" type="primaryAuto" onPress={handleReportPost} />
                  )}
                  <Button title="Cancel" type="secondaryAuto" onPress={() => setReporting(false)} />
                </>
              ) : (
                <Button title="Report Post" type="primaryAuto" onPress={() => setReporting(true)} />
              )}
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContent: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
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


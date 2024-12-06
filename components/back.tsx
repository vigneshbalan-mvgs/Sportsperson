import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the icon library
import { useRouter } from "expo-router";

const BackButton: React.FC<{ to?: string }> = ({ to }) => {
  const router = useRouter();
  const [pressed, setPressed] = useState(false); // Track button press state

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.shadowWrapper}>
      <TouchableOpacity
        onPress={handleBack}
        style={[styles.button, pressed && styles.buttonPressed]} // Apply scale effect on press
        onPressIn={() => setPressed(true)} // Trigger scale effect on press
        onPressOut={() => setPressed(false)} // Revert scale effect when released
      >
        <AntDesign name="left" size={30} color="#07001f" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    left: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  buttonPressed: {
    backgroundColor: "#ccc",
    transform: [{ scale: 0.95 }],
  },
});

export default BackButton;

import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import the icon library
import { colors } from "../const/colors";

const RightIcon: React.FC<{
  icon?: string;
  onPress?: () => void; // Custom onPress action
}> = ({ icon = "plus", onPress }) => {
  const [pressed, setPressed] = useState(false); // Track button press state

  const handlePress = () => {
    if (onPress) {
      onPress(); // Execute the custom onPress action if provided
    } else {
      console.warn("No onPress action provided!");
    }
  };

  return (
    <View style={styles.shadowWrapper}>
      <TouchableOpacity
        onPress={handlePress} // Call the handler
        style={[styles.button, pressed && styles.buttonPressed]} // Apply scale effect on press
        onPressIn={() => setPressed(true)} // Trigger scale effect on press
        onPressOut={() => setPressed(false)} // Revert scale effect when released
      >
        <AntDesign name={icon} size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    right: 20,
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

export default RightIcon;

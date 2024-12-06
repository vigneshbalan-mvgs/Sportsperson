// PasswordInput.js
import constStyles from "@/const/Styles";
import React, { useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/const/colors";

const PasswordInput = ({
  placeholder,
  value,
  onChangeText,
  style,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
        style={[constStyles.inputField, { width: "100%" }]}
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
      >
        <MaterialCommunityIcons
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={20}
          color={colors.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    paddingRight: 15,
    position: "absolute",
    right: 0,
  },
});

export default PasswordInput;

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors, spacing, br, bw, fontSizes } from "@/const/colors";
import constStyles from "@/const/Styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export type ButtonType =
  | "primary"
  | "primaryHalf"
  | "primaryAuto"
  | "secondary"
  | "secondaryHalf"
  | "secondaryAuto";

export interface ButtonProps {
  type?: ButtonType;
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "primary",
  title,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case "primaryHalf":
        return styles.primaryHalfButton;
      case "primaryAuto":
        return styles.primaryAutoButton;
      case "secondaryHalf":
        return styles.secondaryHalfButton;
      case "secondaryAuto":
        return styles.secondaryAutoButton;
      case "secondary":
        return styles.secondaryButton;
      default:
        return styles.primaryButton;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading} // Disable button if loading
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            type === "secondary" ||
            type === "secondaryHalf" ||
            type === "secondaryAuto"
              ? colors.primary
              : colors.textWhite
          }
        />
      ) : (
        <Text
          style={[
            styles.buttonText,
            (type === "secondary" ||
              type === "secondaryHalf" ||
              type === "secondaryAuto") &&
              styles.secondaryButtonText,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    width: wp(80),
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
  },
  primaryHalfButton: {
    width: wp(49), // Half width
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
  },
  primaryAutoButton: {
    width: "auto", // Auto width based on content
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
  },
  secondaryButton: {
    width: wp(99),
    backgroundColor: colors.textWhite,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
    borderWidth: bw.thin,
    borderColor: colors.primary,
  },
  secondaryHalfButton: {
    width: wp(50), // Half width
    backgroundColor: colors.textWhite,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
    borderWidth: bw.thin,
    borderColor: colors.primary,
  },
  secondaryAutoButton: {
    width: "auto", // Auto width based on content
    backgroundColor: colors.textWhite,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
    borderWidth: bw.thin,
    borderColor: colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: fontSizes.md,
    color: colors.textWhite,
    textAlign: "center",
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: colors.primary,
  },
});

export default Button;

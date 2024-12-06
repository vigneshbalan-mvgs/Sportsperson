import { StyleSheet } from "react-native";
import { colors, spacing, fontSizes, br, bw } from "./colors";
import * as Font from "expo-font";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const fetchFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
  });
};

const constStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Text Alignment
  textAlignCenter: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: colors.text,
  },
  textAlignRight: {
    fontFamily: "Poppins-Regular",
    textAlign: "right",
    color: colors.text,
  },
  textAlignLeft: {
    fontFamily: "Poppins-Regular",
    textAlign: "left",
    color: colors.text,
  },

  // General text styling
  bodyText: {
    fontFamily: "Poppins-Bold",
    fontSize: fontSizes.md,
    color: colors.text,
  },
  headingText: {
    fontFamily: "Poppins-Bold",
    fontSize: fontSizes.xxl,
    color: colors.text,
    fontWeight: "900",
  },
  subheadingText: {
    fontFamily: "Poppins-Bold",
    fontSize: fontSizes.lg,
    color: colors.text,
    fontWeight: "900",
  },
  mutedText: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.sm,
    color: colors.placeholderText,
  },

  // Label styling (typically used for form fields)
  labelText: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.md,
    color: colors.text,
    fontWeight: "700",
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },

  // Input Fields
  inputField: {
    fontFamily: "Poppins-Regular",
    backgroundColor: colors.background,
    borderColor: colors.inputBorder,
    borderWidth: bw.thin,
    borderRadius: br.input,
    padding: spacing.sm,
    fontSize: fontSizes.sm,
    color: colors.inputText,
  },
  inputFieldFocused: {
    borderColor: colors.primary,
  },
  inputPlaceholder: {
    fontFamily: "Poppins-Regular",
    color: colors.placeholderText,
  },

  // Buttons
  primaryButton: {
    width: "auto",
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
    alignItems: "center",
    marginTop: spacing.md,
  },
  primaryButtonText: {
    fontFamily: "Poppins-Bold",
    color: colors.textWhite,
    fontSize: fontSizes.md,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: br.button,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontFamily: "Poppins-Bold",
    color: colors.buttonText,
    fontSize: fontSizes.md,
  },

  // Cards
  card: {
    width: "100%",
    height: "auto",
    backgroundColor: colors.cardBackground,
    borderRadius: br.card,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },

  // Divider (used for separating sections)
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.md,
  },

  // Links
  linkText: {
    fontFamily: "Poppins-Regular",
    color: colors.linkText,
    fontSize: fontSizes.sm,
  },
  linkTextHovered: {
    color: colors.linkHoverText,
  },

  // Spacings
  spacingSmall: {
    margin: spacing.sm,
  },
  spacingMedium: {
    margin: spacing.md,
  },
  spacingLarge: {
    margin: spacing.lg,
  },

  // Input field error state
  inputError: {
    borderColor: colors.error,
    backgroundColor: colors.inputErrorBackground,
  },

  // Text for error messages
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.sm,
    color: colors.error,
  },

  // Loading spinner
  loadingSpinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Custom header (optional)
  customHeader: {
    backgroundColor: colors.headerBackground,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },

  // Modal
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalBackground,
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: br.modal,
    padding: spacing.md,
    width: wp(100),
  },

  // Checkbox
  checkboxLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.md,
    color: colors.text,
    marginLeft: spacing.sm,
  },

  // Radio button
  radioLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.md,
    color: colors.text,
    marginLeft: spacing.sm,
  },

  // Badge
  badge: {
    backgroundColor: colors.primaryLowOpacity,
    borderRadius: br.badge,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  badgeText: {
    fontFamily: "Poppins-Bold",
    fontSize: fontSizes.sm,
    color: colors.badgeText,
  },

  // Tooltip
  tooltip: {
    backgroundColor: colors.tooltipBackground,
    padding: spacing.sm,
    borderRadius: br.tooltip,
    position: "absolute",
    bottom: "100%",
    left: "50%",
  },
  tooltipText: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.sm,
    color: colors.tooltipText,
  },

  // Toast
  toast: {
    position: "absolute",
    bottom: spacing.md,
    left: "50%",
    backgroundColor: colors.toastBackground,
    padding: spacing.sm,
    borderRadius: br.toast,
  },
  toastText: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.md,
    color: colors.toastText,
  },
});

export default constStyles;

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const colors = {
  // Backgrounds
  background: "#FFFFFF",
  inputBackground: "#F8F8F8",
  cardBackground: "#FFFFFF",

  // Text
  text: "#000000",
  textWhite: "#fff",
  inputText: "#000000",
  placeholderText: "#545454",

  // Primary Colors
  primary: "#FE0000",
  primaryLight: "#FF4D4D",
  primaryDark: "#B30000",
  primaryLowOpacity: "rgba(254, 0, 0, 0.1)",
  primaryMediumOpacity: "rgba(254, 0, 0, 0.5)",
  primaryHighOpacity: "rgba(254, 0, 0, 0.8)",

  // Secondary Colors
  secondary: "#545454",
  secondaryLight: "#757575",
  secondaryDark: "#333333",
  secondaryLowOpacity: "rgba(84, 84, 84, 0.1)",
  secondaryMediumOpacity: "rgba(84, 84, 84, 0.5)",
  secondaryHighOpacity: "rgba(84, 84, 84, 0.8)",

  // Buttons
  buttonBackground: "#FE0000",
  buttonText: "#FFFFFF",
  buttonBorder: "#FE0000",

  // Links
  linkText: "#FE0000",
  linkHoverText: "#D50000",

  inputBorder: "#E1E1E1",
  inputPlaceholder: "#B3B3B3",

  // Miscellaneous
  divider: "#E1E1E1",
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowLowOpacity: "rgba(0, 0, 0, 0.05)",
  shadowHighOpacity: "rgba(0, 0, 0, 0.2)",
};

export const spacing = {
  xs: hp("0.5%"), // Extra Small
  sm: hp("1.2%"), // Small
  md: hp("2%"), // Medium
  lg: hp("3%"), // Large
  xl: hp("4%"), // Extra Large
};

export const fontSizes = {
  xs: wp("3%"), // Extra Small
  sm: wp("3.5%"), // Small
  md: wp("4%"), // Medium
  lg: wp("5%"), // Large
  xl: wp("6%"), // Extra Large
  xxl: wp("8%"), // Double Extra Large
};

export const br = {
  default: wp("2%"),
  input: wp("2.5%"),
  button: wp("2%"),
  card: wp("3%"),
};

export const bw = {
  thin: wp("0.3%"),
  thick: wp("0.5%"),
};

export const theme = {
  colors,
  spacing,
  fontSizes,
  br,
  bw,
};

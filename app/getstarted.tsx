import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { ResizeMode } from "expo-av";
import { Link, router } from "expo-router";
import { colors, spacing, br, bw, fontSizes } from "../const/colors";
// import constStyles from "../const/Styles.js";
import constStyles from "@/const/Styles";
import * as SecureStore from "expo-secure-store";

export default function GetStarted() {
  return (
    <View style={constStyles.container}>
      <Video
        style={styles.video}
        source={require("../assets/video.mp4")}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
        rate={0.8}
      />
      <View style={styles.viewContainer}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.image}
        />
        <Text style={styles.text}>WELCOME TO SPORTSPERSON</Text>
        <Text style={styles.smallText}>
          Your all-in-one platform to connect, share, and grow in the world of
          sports and professional networking. Stay inspired, track progress, and
          build lasting connections
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            router.replace("/login");
          }}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    opacity: 0.4,
  },
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: spacing.md,
  },
  text: {
    fontSize: fontSizes.xxl,
    color: colors.textWhite,
    textAlign: "center",
    marginVertical: spacing.sm,
    fontWeight: "bold",
  },
  smallText: {
    fontSize: fontSizes.sm,
    color: colors.textWhite,
    textAlign: "center",
    marginHorizontal: spacing.sm,
    marginVertical: spacing.md,
  },
  button: {
    position: "absolute",
    backgroundColor: colors.textWhite,
    borderRadius: br.default,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    bottom: spacing.xl,
  },
  buttonText: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: "bold",
  },
});

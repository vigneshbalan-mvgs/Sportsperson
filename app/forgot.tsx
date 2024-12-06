import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

// Components
import BackButton from "@components/back";
import TextInputComponent from "@components/TextInput";
import ButtonComponent from "@components/Button";

// Styles
import constStyles from "../const/Styles";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleForgotPassword = async () => {
    if (email.trim() === "") {
      setError("Please enter your email.");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send password reset email
      await auth().sendPasswordResetEmail(email.trim());
      Alert.alert(
        "Success",
        "Password reset email sent! Please check your inbox.",
        [{ text: "OK", onPress: () => router.push("/login") }],
      );
      console.info("Password reset email sent!");
    } catch (e) {
      console.error("Error sending password reset email:", e);
      setError(
        e.message ||
          "An error occurred while trying to send the password reset email.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackButton />
      <View style={constStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={[constStyles.headingText, { marginTop: 60 }]}>
            Forgot Password
          </Text>
          <Text style={constStyles.mutedText}>
            Please enter your email address
          </Text>
          <TextInputComponent
            label="Your Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            style={{ marginTop: 20 }}
          />
          {error && <Text style={styles.error}>{error}</Text>}

          <ButtonComponent
            title="Reset Password"
            onPress={handleForgotPassword}
            disabled={loading}
          />

          {loading && <ActivityIndicator size="small" color="#00ff00" />}
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
});

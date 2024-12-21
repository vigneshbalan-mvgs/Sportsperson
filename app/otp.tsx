import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import BackButton from "@components/back";
import { colors, fontSizes, spacing, br, bw } from "../const/colors";
import constStyles from "../const/Styles";
import { PORT } from "../const/PORT"

export default function OtpVerification() {
  const route = useRoute();
  const { data, otp, token } = route.params; // Access the OTP, bearer token, and email
  console.log("Verifying OTP:", otp, data, token); // Log the received OTP and token
  const [code, setCode] = useState(otp);
  const [loading, setLoading] = useState(false);
  console.log("OTP entered:", code);
  const token1 = token?.replace(/^"|"$/g, "");
  console.log("Token is:", token1);


  const handleVerify = async (code) => {
    console.log("OTP entered:", code);
    if (code === otp) {
      try {
        setLoading(true);
        const url = `  ${PORT}/api/auth/verify`;
        const options = {
          method: "POST",
          headers: {
            authorization: `Bearer ${token1}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({ code: otp }),
        };

        const response = await fetch(url, options);
        const status = await response.json();
        console.log(status);

        if (status.status == true) {
          router.replace("/login");
        } else {
          // Handle incorrect OTP scenario (e.g., show an error message)
          alert("Incorrect OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  useEffect(() => {
    // Ensure the keyboard appears when the OTP input is focused
    Keyboard.dismiss(); // Dismiss keyboard if open when the screen loads
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* Dismiss keyboard on clicking outside */}
      <View style={constStyles.container}>
        <BackButton />
        <View style={{ flex: 1, alignItems: "flex-start", marginTop: 70 }}>
          <View style={styles.pinCodeContainer}>
            <Text style={constStyles.subheadingText}>Check your email</Text>
            <Text style={constStyles.textAlignLeft}>
              We sent OTP to {token}
            </Text>
          </View>
          <View style={styles.otpcontainer}>
            <OtpInput
              numberOfDigits={6}
              focusStickBlinkingDuration={500}
              onTextChange={(text) => setCode(text)} // Store the user input
              onFilled={(text) => {
                console.log(`OTP is ${text}`);
                handleVerify(text); // Call handleVerify when OTP is filled
              }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
                autoFocus: true, // Ensure the first input receives focus
              }}
            />
          </View>
          <Text style={constStyles.textAlignLeft}>
            Don't receive the code?
            <Text style={constStyles.linkText}>Resend code</Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pinCodeContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: spacing.sm,
  },
  otpcontainer: {
    marginTop: spacing.lg,
    gap: 30,
    marginBottom: spacing.lg,
  },
});

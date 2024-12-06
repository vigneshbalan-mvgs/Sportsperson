import { View, Text, StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import React, { useState } from "react";
import BackButton from "@components/back";

import auth from "@react-native-firebase/auth";
import Button from "@components/Button";

//colors and designs
import { colors, fontSizes, spacing, br, bw } from "../const/colors";
import constStyles from "../const/Styles";

export default function otpverfication() {
  const [email, setEmail] = useState("Test@gmail.com");
  return (
    <View style={constStyles.container}>
      <BackButton />
      <View style={{ flex: 1, alignItems: "left", marginTop: 70 }}>
        <View style={styles.pinCodeContainer}>
          <Text style={constStyles.subheadingText}>Check you email</Text>
          <Text style={constStyles.textAlignLeft}>We sent OTP to {email}</Text>
        </View>
        <View style={styles.otpcontainer}>
          <OtpInput
            numberOfDigits={4}
            focusStickBlinkingDuration={500}
            onTextChange={(text) => console.log(text)}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            textInputProps={{
              accessibilityLabel: "One-Time Password",
            }}
          />

          <Button title="Verify" onPress={() => {}} />
        </View>
        <Text style={constStyles.textAlignLeft}>
          Don't receive the code?
          <Text style={constStyles.linkText}>Resend code</Text>
        </Text>
      </View>
    </View>
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

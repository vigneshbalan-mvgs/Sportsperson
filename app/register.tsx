import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput as RNTextInput } from "react-native-paper";
import { Link, router } from "expo-router";

// Importing styles
import constStyles from "../const/Styles";
import { colors, spacing, fontSizes, br, bw } from "../const/colors";
import ButtonComponant from "@components/Button";
import Input from "@/components/Input";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import PhoneNumberInput from "@components/PhoneNumberInput";
import { PORT } from "@/const/PORT";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    try {
      if (
        !email ||
        !password ||
        !firstname ||
        !lastname ||
        !phoneNumber ||
        password !== confirmPassword
      ) {
        alert("Please fill in all fields correctly.");
        return;
      }

      console.log("button clicked");

      setLoading(true); // Start loading before fetch
      const response = await fetch(`${PORT}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          Password: password,
          firstName: firstname,
          lastName: lastname,
          Phone_Number: phoneNumber,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.status) {
        console.log(data.verification);
        router.push({
          pathname: "/otpverfication",
          params: { data: data.data, otp: data.Verification },
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false); // Ensure loading is stopped in all cases
    }
  };

  return (
    <View style={[constStyles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: hp(100) }}
      >
        <KeyboardAvoidingView behavior="padding">
          <View style={{ height: hp(13) }}>
            <Image
              source={require("../assets/images/Logo.png")}
              style={styles.logo}
            />
          </View>

          <View style={[styles.banner, { height: hp(5) }]}>
            <Text style={constStyles.headingText}>New Account</Text>
          </View>

          {/* Existing Account Link */}
          <View style={styles.loginLinkContainer}>
            <Text style={constStyles.bodyText}>
              If you have an existing account /{" "}
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={constStyles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: hp(70) }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: wp(45) }}>
                <Text style={constStyles.labelText}>First Name</Text>
                <TextInput
                  style={constStyles.inputField}
                  value={firstname}
                  onChangeText={setFirstname}
                  placeholder="Enter your first name"
                />
              </View>

              <View style={{ width: wp(45) }}>
                <Text style={constStyles.labelText}>Last Name</Text>
                <TextInput
                  style={constStyles.inputField}
                  value={lastname}
                  onChangeText={setLastname}
                  placeholder="Enter your last name"
                />
              </View>
            </View>

            {/* Phone Number Input */}
            <Text style={constStyles.labelText}>Phone Number</Text>
            <PhoneNumberInput
              style={constStyles.inputField}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Phone Number"
            />

            {/* Email Input */}
            <Text style={constStyles.labelText}>Email Address</Text>
            <TextInput
              style={constStyles.inputField}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email Address"
            />

            {/* Password Input */}
            <Text style={constStyles.labelText}>Create Password</Text>
            <Input
              placeholder="Create Password"
              value={password}
              onChangeText={setPassword}
            />
            <Text style={constStyles.mutedText}>
              Must be at least 8 characters
            </Text>

            {/* Confirm Password Input */}
            <Text style={constStyles.labelText}>Confirm Password</Text>
            <Input
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            {/* Terms and Conditions */}
            <TouchableOpacity>
              <Text style={[styles.termsText]}>
                By continuing, you agree to our{" "}
                <Text style={styles.termsUnderline}>
                  app terms and conditions
                </Text>
              </Text>
            </TouchableOpacity>

            <Text></Text>
            {/* Sign Up Button */}
            <View style={{ alignItems: "center" }}>
              {loading ? (
                <ActivityIndicator size="large" color={colors.primary} />
              ) : (
                <ButtonComponant title="Sign Up" onPress={register} />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  banner: {},
  loginLinkContainer: {
    flexDirection: "row",
  },
  termsText: {
    marginTop: spacing.sm,
    fontSize: 12,
  },
  termsUnderline: {
    textDecorationLine: "underline",
  },
});

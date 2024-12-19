import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import constStyles from "../const/Styles";
import { br, bw, colors, fontSizes, spacing } from "../const/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import Input from "@components/Input";
import { PORT } from "const/PORT";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "124091962395-rtnqh83fsm4u366a639lr80imlo5c72u.apps.googleusercontent.com",
    });
  }, []);

  async function signInWithGoogle() {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      console.log("Attempting to sign in with Google...");
      const signInResult = await GoogleSignin.signIn();
      console.log("Sign in result:", signInResult);

      const idToken = signInResult.idToken;
      console.log("Fetched ID token:", idToken);

      if (!idToken) {
        throw new Error("No ID token found.");
      }

      // Extracting additional user data
      const { email, givenName, familyName, photo } = signInResult.user;
      console.log("User Info:", { email, givenName, familyName, photo });

      if (!email || !givenName || !familyName) {
        Alert.alert("Google Sign-In Error", "Could not fetch user details.");
        setLoading(false);
        return;
      }

      console.log("Attempting to fetch user data...");

      // Send all user details to the backend API
      const response = await fetch(`${PORT}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: givenName,
          lastName: familyName,
          profilePicture: photo, // Sending profile picture URL if you want
        }),
      });
      console.log("Token:", token);

      const result = await response.json();

      if (result.status) {
        if (result.isNewUser) {
          console.log("Redirecting to signup...");
          router.replace("/(insider)/(tabs)");
        } else {
          console.log("Redirecting to home...");
          router.replace("/Home");
        }
      } else {
        Alert.alert("Error", result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error); // Log the error to understand the issue
      Alert.alert("Sign-In Error", error.message || "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  const signIn = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields before logging in.");
      return;
    }

    try {
      setLoading(true);
      console.log("button clicked");

      const response = await fetch(`${PORT}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (result.status) {
        await SecureStore.setItemAsync("isLoggedIn", JSON.stringify(true));
        await SecureStore.setItemAsync("token", JSON.stringify(result.Token));

        router.replace("/Home/");
      } else {
        Alert.alert("Login Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithMicrosoft = async () => {
    Alert.alert("Microsoft Sign-In", "Feature not yet implemented.");
  };
  return (
    <View style={constStyles.container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../assets/images/Logo.png")}
            style={styles.Logo}
          />
          <Image
            source={require("../assets/images/Banner.png")}
            style={styles.Banner}
          />
          <View>
            <Text style={constStyles.headingText}>Hey,</Text>
            <Text style={constStyles.headingText}>Login now.</Text>
            <Text style={styles.text}>
              if you are new / {""}
              <Link href="/register" style={styles.link}>
                sign up for new account
              </Link>
            </Text>
          </View>
          <Text style={constStyles.labelText}>Email Address</Text>
          <TextInput
            style={constStyles.inputField}
            value={email}
            placeholderTextColor={colors.placeholderText}
            onChangeText={setEmail}
            autoCapitalize="none" // Prevents auto-capitalization
            keyboardType="email-address" // Keyboard type for email
            placeholder="Email Address"
            textContentType="emailAddress" // iOS: Helps autofill for email
            returnKeyType="next" // Move to next field
            autoCorrect={false} // Disable autocorrect
          />

          <Text style={constStyles.labelText}>Password</Text>
          <Input
            value={password}
            placeholderTextColor={colors.placeholderText}
            onChangeText={setPassword}
            secureTextEntry={true} // Hides text for security
            placeholder="Password"
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={30}
            textContentType="password" // iOS password autofill support
            blurOnSubmit={true}
          />

          <Link href="/forgot" style={constStyles.linkText}>
            Forgot Password ?
          </Link>
          <TouchableOpacity style={constStyles.primaryButton} onPress={signIn}>
            <Text style={constStyles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
          <Text style={constStyles.textAlignCenter}></Text>
          <Text style={constStyles.textAlignCenter}>OR</Text>
          <View style={styles.lineWrapper}>
            <View style={styles.line} />
            <Text style={styles.orText}>Sign in with</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.socialButtonsRow}>
            <TouchableOpacity
              onPress={signInWithGoogle}
              style={styles.socialButton}
            >
              <Image
                source={require("../assets/images/GoogleLogin.png")} // Path to your Google icon
                style={styles.socialIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={signInWithMicrosoft}
              style={styles.socialButton}
            >
              <Image
                source={require("../assets/images/MicrosoftLogin.png")} // Path to your Microsoft icon
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  Logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  Banner: {
    width: wp(100),
    height: 150,
  },
  link: {
    fontFamily: "Poppins-SemiBold",
    color: colors.primary,
    fontSize: fontSizes.md,
  },
  text: {
    fontFamily: "Poppins-Regular",
    textAlign: "left",
  },
  lineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text, // Adjust the line color if needed
    flex: 1,
  },
  orText: {
    fontFamily: "Poppins-Regular",
    fontSize: fontSizes.sm,
    textAlign: "center",
    marginHorizontal: 10,
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  socialButton: {
    width: "45%",
    marginHorizontal: 10,
    borderRadius: br.button,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    padding: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {},
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { router, Link } from "expo-router";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import constStyles from "../const/Styles";
import { colors, fontSizes, spacing, br, bw } from "../const/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Input from "@components/Input";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // google-signin
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "124091962395-rtnqh83fsm4u366a639lr80imlo5c72u.apps.googleusercontent.com",
    });
  }, []);

  // Google sign-in function
  async function signInWithGoogle() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    console.log("Environment:", __DEV__ ? "Development" : "Production");

    try {
      setLoading(true);

      // Ensure device has Google Play services
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Attempt to sign in
      const signInResult = await GoogleSignin.signIn();
      console.log("Sign-In Result:", signInResult); // Full sign-in result

      // Extract the ID token from sign-in result
      const idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error("No ID token found in sign-in result.");
      }

      // Create Google credential with the ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with the Google credential
      await auth().signInWithCredential(googleCredential);

      // Get more details of the signed-in user
      const user = await GoogleSignin.getCurrentUser();

      console.log("User details:", user);
      console.log("User name:", user?.user.name);
      console.log("User email:", user?.user.email);
      console.log("User photo:", user?.user.photo);

      const { name, email, photo } = user?.user || {};

      // Once signed in, route the user to the Home page
      router.replace("/(insider)/(tabs)/Home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert(
        "Sign-In Error",
        error.message || "Failed to sign in with Google.",
      );
    } finally {
      setLoading(false);
    }
  }

  const signIn = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields before logging in.");
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);

      const user = auth().currentUser;
      if (user && user.emailVerified) {
        // User is verified and can proceed to the home page
        router.replace("/(insider)/(tabs)/Home");
      } else {
        // If the user is not verified, send the verification link again
        if (user) {
          await user.sendEmailVerification();
          alert(
            "Please verify your email before logging in. A new verification link has been sent to your email.",
          );
        }
        await auth().signOut(); // Log the user out if not verified
      }
    } catch (e: any) {
      const err = e as FirebaseError;
      console.log("Sign-in error: " + err.message);
      Alert.alert("Sign-In Error", "Username or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  const signInWithMicrosoft = () => {};

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

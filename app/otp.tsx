import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";

import auth from "@react-native-firebase/auth";

export default function OTP() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { query } = router;

  const verify = async () => {
    try {
      await auth().signInWithVerificationId(query.email as string, code);
      router.push("/(tabs)/Home");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={(text) => setCode(text)}
        placeholder="Enter OTP"
        keyboardType="number-pad"
      />
      <Button title="Verify" onPress={verify} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    marginVertical: 5,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  error: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
  },
});


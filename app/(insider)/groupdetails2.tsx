import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BackButton from "@components/back";
import { br, colors } from "@/const/colors";
import Button from "@components/Button";
import constStyles from "@/const/Styles";
import { router } from "expo-router";

const GroupChat = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Request Permissions on Component Mount
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need permissions to access your photos.");
      }
    })();
  }, []);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0]?.uri || null); // Set image URI from picker result
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <View style={styles.contentContainer}>
        {/* TouchableOpacity to select and tap image */}
        <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
          <Image
            style={styles.groupImage}
            resizeMode="cover"
            source={
              selectedImage
                ? { uri: selectedImage } // Dynamically render user-selected image
                : require("@/assets/images/contnet.jpg") // Default placeholder if no image is selected
            }
          />
          <Text style={styles.imageText}>Tap to select group image</Text>
        </TouchableOpacity>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter group name here..."
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={5}
            placeholder="Enter description here..."
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Button
            onPress={() => {
              router.replace("/(insider)/(tabs)/Messages");
            }}
            title="Create Group"
          />
        </View>
      </View>
    </View>
  );
};

export default GroupChat;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  backButtonContainer: {
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  groupImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    marginTop: 10,
    fontSize: 14,
    color: "gray",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: br.input,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

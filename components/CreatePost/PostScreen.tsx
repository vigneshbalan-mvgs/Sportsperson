import React, { useState } from "react";
import {
  StyleSheet,
  Alert,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import BackButton from "@components/back";
import RightIcon from "@components/RightIcon";

const PostScreen = ({ uri }) => {
  const [selectedImage, setSelectedImage] = useState(uri);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("image");

  const pickImage = async () => {
    console.log("Requesting media library permissions...");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permission status:", status);

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    console.log("Launching image picker...");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    console.log("Image picker result:", result);

    if (!result.canceled && result.assets && result.assets[0].uri) {
      console.log("Selected image URI:", result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
    } else {
      console.log("No image selected or operation canceled.");
    }
  };

  const handlePost = async () => {
    if (!description || !location) {
      Alert.alert("Please fill in all the required fields.");
      return;
    }

    // Create FormData object
    const form = new FormData();
    form.append("location", location);
    form.append("description", description);
    form.append("type", type);

    if (selectedImage) {
      const imageUri = selectedImage; // URI from ImagePicker
      const filename = imageUri.split("/").pop(); // Extract filename
      const filetype = `image/${filename.split(".").pop()}`; // Determine MIME type

      form.append("URL", { uri: imageUri, name: filename, type: filetype });
    }

    const url = "http://147.79.68.157:4500/api/user/post";
    const token = await SecureStore.getItemAsync("token");
    console.log("Token:", token);
    const token1 =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWM1ZGY3MWQ0YWE5MmFhNjZlOGU5NiIsInV1aWQiOiJWbXpJc2xfSkdwWGNrbHotdm5sekIiLCJFbWFpbF9JRCI6InZpZ25lc2hiYWxhbm12Z3MyMDAzQGdtYWlsLmNvbSIsImlhdCI6MTczNDEwNjY0MSwiZXhwIjoxNzM0MTkzMDQxfQ.6jp-Z6NfXOrZqTvdS1pBvD1Av3IZXW4s_dLh69reHt4";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${token1}`,
      },
      body: form,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Post response:", data);

      if (data.status) {
        alert("Post Created Successfully: " + JSON.stringify(data));
        router.replace("/");
      } else {
        alert("Error creating post: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error during post request:", error);
      alert("Error creating post: " + error.message);
    }
  };
  return (
    <View style={styles.container}>
      {/* Add Media Section */}
      <View style={styles.addMediaSection}>
        {!selectedImage && (
          <>
            <Text style={styles.label}>Add Media</Text>
            <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
              <Text>🖼️</Text>
            </TouchableOpacity>
          </>
        )}
        {selectedImage && (
          <View style={styles.selectedImageContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                console.log("Removing selected image.");
                setSelectedImage("");
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImage }}
              style={styles.selectedImage}
            />
          </View>
        )}
      </View>

      {/* Location Input */}
      <TextInput
        style={styles.textEditor}
        placeholder="Enter location..."
        value={location}
        onChangeText={(text) => {
          setLocation(text);
        }}
      />

      {/* Description Input */}
      <TextInput
        style={styles.textEditor}
        multiline
        placeholder="Write your thoughts..."
        textAlignVertical="top"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      {/* Post Button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  closeButton: {
    position: "absolute",
    zIndex: 1,
    top: 20,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 50,
    opacity: 0.4,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  textEditor: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  addMediaSection: {
    marginTop: 50,
    marginBottom: 20,
  },
  iconButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  postButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

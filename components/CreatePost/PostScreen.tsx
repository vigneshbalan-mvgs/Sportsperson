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
import { Video } from "expo-av"; // Video component from expo-av
import { PORT } from "@/const/PORT";

const PostScreen = ({ uri, type }) => {
  const [selectedMedia, setSelectedMedia] = useState(uri);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [mediaType, setMediaType] = useState(type); // To handle media type dynamically
  console.log(uri, type);

  const pickMedia = async () => {
    console.log("Requesting media library permissions...");
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Permission status:", status);

    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }

    console.log("Launching media picker...");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    console.log("Media picker result:", result);

    if (!result.canceled && result.assets && result.assets[0].uri) {
      console.log("Selected media URI:", result.assets[0].uri);
      setSelectedMedia(result.assets[0].uri);
      setMediaType(result.assets[0].type); // Set type as either 'image' or 'video'
    } else {
      console.log("No media selected or operation canceled.");
    }
  };

  const handlePost = async () => {
    if (!description || !location) {
      Alert.alert("Please fill in all the required fields.");
      return;
    }

    const mediaUri = selectedMedia; // URI from media picker
    const filename = mediaUri.split("/").pop(); // Extract filename

    // Create FormData object
    const form = new FormData();
    form.append("location", location);
    form.append("description", description);
    form.append("type", mediaType);

    // Ensure media is handled correctly based on type (image/video)
    form.append("URL", {
      uri: mediaUri,
      name: filename,
      type: mediaType === "image" ? "image/jpeg" : "video/mp4", // Adjust based on media type
    });

    const url = `${PORT}/api/user/post`;

    const sanitizedToken = await SecureStore.getItemAsync("token");
    const token = sanitizedToken?.replace(/^"|"$/g, ""); // Removes leading and trailing quotes

    const options = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: form,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Post response:", data);

      if (data.status) {
        alert("Post Created Successfully");
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
        {!selectedMedia && (
          <>
            <Text style={styles.label}>Add Media</Text>
            <TouchableOpacity style={styles.iconButton} onPress={pickMedia}>
              <Text>📸</Text>
            </TouchableOpacity>
          </>
        )}
        {selectedMedia && mediaType === "image" && (
          <View style={styles.selectedImageContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                console.log("Removing selected image.");
                setSelectedMedia("");
                setMediaType("image");
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedMedia }}
              style={styles.selectedImage}
            />
          </View>
        )}

        {selectedMedia && mediaType === "video" && (
          <View style={styles.selectedMediaContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                console.log("Removing selected video.");
                setSelectedMedia("");
                setMediaType("image");
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Video
              source={{ uri: selectedMedia }}
              style={styles.selectedVideo}
              useNativeControls
              isLooping
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
  selectedImageContainer: {
    width: "100%",
    position: "relative",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: 'center',
    aspectRatio: 1 / 1,
  },
  selectedImage: {
    width: "100%",
    borderRadius: 10,
    aspectRatio: 1 / 1,
  },
  selectedMediaContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },
  selectedVideo: {
    width: "100%",
    borderRadius: 10,
    aspectRatio: 1 / 1,
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


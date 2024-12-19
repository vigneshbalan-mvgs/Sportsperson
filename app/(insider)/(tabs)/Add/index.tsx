import { AntDesign } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import PostScreen from "@components/CreatePost/PostScreen";
import RightIcon from "@components/RightIcon";

export default function App() {
  let cameraRef = useRef(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [taken, setTaken] = useState(false);
  const [fileType, setFileType] = useState<string>("");

  // Request permissions for camera and media library
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      </SafeAreaView>
    );
  }

  const savePhoto = async () => {
    if (cameraRef.current) {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
        aspectRatio: 16 / 19,
      };

      const newPhoto = await cameraRef.current.takePictureAsync(options);

      await MediaLibrary.saveToLibraryAsync(newPhoto.uri);
      setPhoto(newPhoto.uri);
      setFileType("image"); // Set file type to image
      setTaken(true);
    }
  };

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
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow both images and videos
      allowsEditing: false,
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setTaken(true);
      setPhoto(result.assets[0].uri);

      // Check if the selected asset is an image or video based on MIME type
      if (result.assets[0].type === "photo") {
        setFileType("image");
      } else if (result.assets[0].type === "video") {
        setFileType("video");
      }
    }

    console.log("Image picker result:", result);
  };

  return (
    <View style={styles.container}>
      {taken ? (
        <Modal style={{ flex: 1, flexDirection: "column" }}>
          <RightIcon icon="close" onPress={() => setTaken(false)} />
          <PostScreen uri={photo} type={fileType} />
        </Modal>
      ) : (
        <>
          {/* Camera */}
          <CameraView style={styles.camera} ref={cameraRef} />

          <View style={styles.cameraOverlay}>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={savePhoto}>
              <AntDesign name="camera" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
              <AntDesign name="picture" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  cameraOverlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    gap: 20,
    bottom: 100,
    alignSelf: "center",
  },
  cameraButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 20,
  },
});


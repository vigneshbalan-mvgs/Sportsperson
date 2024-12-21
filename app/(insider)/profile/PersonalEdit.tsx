import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import BackButton from "@components/back";
import RightIcon from "@components/RightIcon";
import TextInputComponent from "@components/TextInput";
import Button from "@components/Button"; // Assuming you have a Save button component
import constStyles from "@/const/Styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/const/colors";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker"; // Importing ImagePicker
import { PORT } from "@/const/PORT";
import useFetchWithToken from "@/const/fetch";
import { getImage, getName, getToken, getUuid } from '@/hooks/userDetails';


const PersonalDetails = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [work, setWork] = useState("");
  const [club, setClub] = useState("");

  const [schools, setSchools] = useState([""]);
  const [colleges, setColleges] = useState([""]);
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150", // Default profile image
  );

  useEffect(() => {
    const loadUserData = async () => {
      const imageUrl = await getImage();
      setProfileImage(imageUrl);
      const userName = await getName();
      setNickname(userName);

      console.log({ imageUrl, userName });
    };

    loadUserData(); // Call the function once when the component mounts
  }, []); // Empty dependency array ensures it runs only once


  const handleAddSchool = () => {
    if (schools.length >= 4) {
      alert("You can only add up to 4 schools.");
      return;
    }
    setSchools([...schools, ""]);
  };

  const handleAddCollege = () => {
    if (colleges.length >= 3) {
      alert("You can only add up to 3 colleges.");
      return;
    }
    setColleges([...colleges, ""]);
  };

  const handleSave = async () => {
    // Validation to ensure all required fields are filled
    const allFieldsValid =
      profileImage !== "https://via.placeholder.com/150"; // Example check for profile image

    if (!allFieldsValid) {
      alert("Please fill in all required fields before saving.");
      return;
    }

    // Prepare FormData to send to the API
    const formData = new FormData();
    formData.append("Nickname", nickname);
    formData.append("Phone_Number", phoneNumber);
    formData.append("Date_of_Birth", dob);
    formData.append("Gender", gender);
    formData.append("Work", work);
    formData.append("Club", club);

    formData.append("First_Name", firstName);
    formData.append("Last_Name", lastName);
    schools.forEach((school, index) => {
      formData.append(`Education[school][${index}]`, school);
    });

    colleges.forEach((college, index) => {
      formData.append(`Education[college][${index}]`, college);
    });

    // Handle profile image
    const localUri = profileImage;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    const fileToUpload = {
      uri: localUri,
      name: filename,
      type,
    };
    formData.append("Profile_ImgURL", fileToUpload);

    try {
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${await getToken()}`,
        },
        body: formData

      }
      console.log("Token:", await getToken());
      const response = await fetch(`${PORT}/api/user/profile_save`, options);

      const data = await response.json(); // Parse the JSON response

      console.log(data); // Log the response data for debugging

      if (data.success) {
        alert("Profile updated successfully!");
        router.back(); // Navigate back
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving the profile. Please try again.");
    }
  };

  const pickImage = async () => {
    try {
      // Request permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permission to access the camera roll is required.");
        return;
      }

      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Make it a square
        quality: 0.7, // Highest quality
      });

      if (result.canceled) {
        console.log("Image selection was cancelled.");
        return;
      }

      // Check if assets array contains image URI
      if (result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;

        if (imageUri) {
          console.log("Selected image URI:", imageUri); // Log the URI
          setProfileImage(imageUri); // Update profile image with selected one
        } else {
          console.log("No image URI in the selected result.");
          alert("No image URI returned. Please try again.");
        }
      } else {
        console.log("No assets found in the image picker result.");
        alert("No image was selected. Please try again.");
      }
    } catch (error) {
      console.error("Error picking image: ", error);

      if (error?.message) {
        // Specific error message from the ImagePicker API
        alert(`Error: ${error.message}`);
      } else {
        // Generic fallback error message
        alert("An error occurred while picking the image. Please try again.");
      }

      // Log additional error info for debugging
      if (error?.response) {
        console.error("Error response:", error.response);
      }

      if (error?.stack) {
        console.error("Error stack:", error.stack);
      }
    }
  };

  return (
    <View style={constStyles.ScreenContainer}>
      <BackButton />
      <RightIcon icon="save" onPress={handleSave} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingRight: 20, paddingLeft: 20 }}
      >
        <View style={{ alignItems: "center", marginTop: 70 }}>
          <Text style={constStyles.headingText}>Personal Details</Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
              resizeMode="cover"
              defaultSource={{ uri: profileImage }} // Provide a default image if URI is unavailable
            />
            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
              <AntDesign name="camera" size={40} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Name */}
        <Text style={constStyles.labelText}>Name</Text>
        <TextInputComponent placeholder="Name" value={firstName} onChangeText={setFirstName} />

        {/* Nickname */}
        <Text style={constStyles.labelText}>Nick Name</Text>
        <TextInputComponent
          placeholder="Display Name"
          value={nickname}
          onChangeText={setNickname}
        />

        {/* Phone Number */}
        <Text style={constStyles.labelText}>Phone Number</Text>
        <View>
          <TextInputComponent
            style={styles.flex}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.verifyButton}>
            <AntDesign name="check" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {/* Date of Birth */}
        <Text style={constStyles.labelText}>Date of Birth</Text>
        <TextInputComponent value={dob} placeholder="Date of Birth" onChangeText={setDob} />

        {/* Gender */}
        <Text style={constStyles.labelText}>Gender</Text>
        <TextInputComponent value={gender} placeholder="Gender" onChangeText={setGender} />

        {/* Schools */}
        <Text style={constStyles.labelText}>Schools</Text>
        {schools.map((_, index) => (
          <TextInputComponent
            key={index}
            placeholder={`School ${index + 1} Name`}
            value={schools[index]}
            onChangeText={(text) =>
              setSchools((prev) =>
                prev.map((school, i) => (i === index ? text : school)),
              )
            }
          />
        ))}
        {schools.length < 4 && (
          <TouchableOpacity onPress={handleAddSchool}>
            <Text style={constStyles.linkText}>+ Add Another School</Text>
          </TouchableOpacity>
        )}

        {/* Colleges */}
        <Text style={constStyles.labelText}>Colleges</Text>
        {colleges.map((_, index) => (
          <TextInputComponent
            key={index}
            placeholder={`College ${index + 1} Name`}
            value={colleges[index]}
            onChangeText={(text) =>
              setColleges((prev) =>
                prev.map((college, i) => (i === index ? text : college)),
              )
            }
          />
        ))}
        {colleges.length < 3 && (
          <TouchableOpacity onPress={handleAddCollege}>
            <Text style={constStyles.linkText}>+ Add Another College</Text>
          </TouchableOpacity>
        )}

        {/* Work */}
        <Text style={constStyles.labelText}>Currently Working At</Text>
        <TextInputComponent placeholder="Workplace Name" value={work} onChangeText={setWork} />

        {/* Club */}
        <Text style={constStyles.labelText}>Current Club Name</Text>
        <TextInputComponent placeholder="Club Name" value={club} onChangeText={setClub} />
      </ScrollView>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginRight: 10,
  },
  verifyButton: {
    position: "absolute",
    padding: 10,
    borderRadius: 5,
    right: 10,
    top: "10%",
  },
  addFieldText: {
    color: "#007BFF",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  editButton: {
    position: "absolute",
    bottom: 10,
    right: 0,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});


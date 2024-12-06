import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BackButton from "@components/back";
import constStyles from "@/const/Styles";
import { useRouter } from "expo-router";

const PersonalDetails = () => {
  const router = useRouter();
  const [schools] = useState(["School 1", "School 2"]); // Example school data
  const [colleges] = useState(["College 1"]); // Example college data
  const [profileImage] = useState(
    "https://via.placeholder.com/150", // Default profile image
  );

  return (
    <View style={constStyles.ScreenContainer}>
      <BackButton />
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => router.push("/profile/PersonalEdit")}
      >
        <Text style={constStyles.linkText}>Edit</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headingContainer}>
          <Text style={constStyles.headingText}>Personal Details</Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        {/* Name Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>

        {/* Nickname Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Nick Name:</Text>
          <Text style={styles.value}>Johnny</Text>
        </View>

        {/* Phone Number Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>+1 234 567 890</Text>
        </View>

        {/* Email Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Email Id:</Text>
          <Text style={styles.value}>john.doe@example.com</Text>
        </View>

        {/* Date of Birth Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>01/01/1990</Text>
        </View>

        {/* Gender Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>Male</Text>
        </View>

        {/* Schools Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Schools:</Text>
          <View>
            {schools.map((school, index) => (
              <Text key={index} style={styles.value}>
                {school}
              </Text>
            ))}
          </View>
        </View>

        {/* Colleges Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Colleges:</Text>
          <View>
            {colleges.map((college, index) => (
              <Text key={index} style={styles.value}>
                {college}
              </Text>
            ))}
          </View>
        </View>

        {/* Work Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Currently Working At:</Text>
          <Text style={styles.value}>TechCorp</Text>
        </View>

        {/* Club Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Current Club Name:</Text>
          <Text style={styles.value}>Chess Club</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  headingContainer: {
    alignItems: "center",
    marginTop: 70,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
});

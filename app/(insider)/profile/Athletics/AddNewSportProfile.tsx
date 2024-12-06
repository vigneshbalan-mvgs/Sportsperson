import React, { useState } from "react";
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import BackButton from "@/components/back";
import TextInputComponent from "@components/TextInput";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import constStyles from "@/const/Styles";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { colors } from "@/const/colors";

const AddNewSportProfile = () => {
  const [certificates, setCertificates] = useState([]);
  const [editCertificateId, setEditCertificateId] = useState(null);
  const [media, setMedia] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [occasion, setOccasion] = useState("");
  const [year, setYear] = useState("");

  // Handle certificate upload
  const pickCertificate = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type === "cancel") {
      Alert.alert("Cancelled", "No file was selected.");
      setModalVisible(true);
      return;
    }
    if (!occasion || !year) {
      setModalVisible(true);
      return Alert.alert("Error", "Please fill in both occasion and year.");
    }

    if (result.type !== "cancel") {
      const newCertificate = {
        id: editCertificateId || certificates.length + 1,
        name: result.name,
        occasion,
        year,
        uri: result.uri, // Include the file URI for preview
      };

      if (editCertificateId) {
        // Replace the existing certificate
        const updatedCertificates = certificates.map((cert) =>
          cert.id === editCertificateId ? newCertificate : cert,
        );
        setCertificates(updatedCertificates);
        setEditCertificateId(null); // Exit editing mode
      } else {
        // Add a new certificate
        setCertificates([...certificates, newCertificate]);
      }
    }
  };

  const handleEdit = (id) => {
    const certificateToEdit = certificates.find((cert) => cert.id === id);
    if (certificateToEdit) {
      setEditCertificateId(id);
      setOccasion(certificateToEdit.occasion); // Populate occasion for editing
      setYear(certificateToEdit.year); // Populate year for editing
    }
  };

  // Handle media upload
  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });
    if (!result.canceled) {
      const selectedMedia = result.assets.map((asset, index) => ({
        id: media.length + index + 1,
        uri: asset.uri,
      }));
      setMedia([...media, ...selectedMedia]);
    }
  };

  // Remove certificate
  const removeCertificate = (id) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
  };

  // Remove media
  const removeMedia = (id) => {
    setMedia(media.filter((item) => item.id !== id));
  };

  return (
    <View style={constStyles.container}>
      <BackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 20, marginTop: 20, alignItems: "center" }}>
          <Text style={styles.headingText}>Create Athletics Profile</Text>
        </View>

        {/* Input Fields */}
        <View>
          <Text style={constStyles.labelText}>Game Name</Text>
          <TextInputComponent placeholder="Game Name" />
          <Text style={constStyles.labelText}>No of Years</Text>
          <TextInputComponent
            placeholder="No of Years"
            keyboardType="numeric"
          />
          <Text style={constStyles.labelText}>No of Matches</Text>
          <TextInputComponent
            placeholder="No of Matches"
            keyboardType="numeric"
          />
        </View>

        {/* Certificate Upload Section */}
        <View style={styles.uploadSection}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={styles.sectionTitle}>Upload Certificate</Text>
            <TouchableOpacity
              style={styles.CertificateUploadSection}
              onPress={() => setModalVisible(true)}
            >
              <AntDesign name="plus" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Occasion</Text>
              <Text style={styles.tableHeaderText}>Year</Text>
              <Text style={styles.tableHeaderText}>Edit</Text>
              <Text style={styles.tableHeaderText}>Remove</Text>
            </View>
            {certificates.map((cert) => (
              <View key={cert.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{cert.occasion}</Text>
                <Text style={styles.tableCell}>{cert.year}</Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    handleEdit(cert.id);
                  }}
                >
                  <AntDesign name="edit" size={24} color={colors.primary} />
                </TouchableOpacity>

                <Text
                  style={styles.tableCell}
                  onPress={() => removeCertificate(cert.id)}
                >
                  🗑️
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Media Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload Photos or Videos</Text>
          <FlatList
            data={media}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.mediaPreview}>
                {/* <Text style={styles.mediaText}> */}
                {/*   {item.uri.split("/").pop()} */}
                {/* </Text> */}
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: "100%", height: 100 }}
                  resizeMode="cover"
                />
                <Text
                  style={styles.removeButton}
                  onPress={() => removeMedia(item.id)}
                >
                  <FontAwesome name="remove" size={28} color={colors.primary} />
                </Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={pickMedia}>
            <Text style={styles.uploadButtonText}>
              {media.length > 0 ? "Add More Media" : "Upload Media"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Certificate</Text>
            <View style={{ position: "absolute", top: 10, right: 10 }}>
              <AntDesign
                name="close"
                size={24}
                color={colors.primary}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <View style={{ width: "100%" }}>
              <TextInputComponent
                placeholder="Occasion"
                value={occasion}
                onChangeText={setOccasion}
              />
              <TextInputComponent
                placeholder="Year"
                value={year}
                onChangeText={setYear}
              />
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                pickCertificate();
                setOccasion("");
                setYear("");
              }}
            >
              <Text style={styles.modalButtonText}>Add Certificate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddNewSportProfile;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  uploadSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  CertificateUploadSection: {
    padding: 10,
    backgroundColor: colors.textWhite,
    borderRadius: 40,
    alignItems: "center",
    elevation: 4,
  },
  uploadButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  uploadButtonText: {
    fontSize: 16,
    color: colors.primary,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  mediaPreview: {
    width: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 5,
    borderRadius: 5,
  },
  mediaText: {
    fontSize: 12,
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },

  modalButton: {
    backgroundColor: colors.primary,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ddd",
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

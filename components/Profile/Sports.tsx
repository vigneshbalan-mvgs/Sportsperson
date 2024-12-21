import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { theme, colors } from "../../const/colors";
import { AntDesign } from "@expo/vector-icons";

const Sports = ({ data }) => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const radius = screenWidth / 3; // Set the radius dynamically based on screen width
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Check if data is defined and is an array
  const sportsInfo = Array.isArray(data) ? data : [];

  const openModal = (item) => {
    if (!item) return;
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.sportscontainer}>
      {sportsInfo.length > 0 ? (
        sportsInfo.map((item, index) => {
          const angle = (Math.PI / (sportsInfo.length - 1)) * index; // Divide the semi-circle into equal parts
          const x = radius * Math.cos(angle); // X-coordinate
          const y = radius * Math.sin(angle); // Y-coordinate (negative for inverted semi-circle)

          return (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.sportsimage1,
                {
                  position: "absolute",
                  left: screenWidth / 2 + x - wp(9), // Center the image horizontally
                  top: y - wp(9), // Adjust for the radius and align vertically
                },
              ]}
              onPress={() => openModal(item)}
            >
              <Image
                source={{ uri: item.sp || "https://via.placeholder.com/150" }}
                style={styles.sportsimage}
                resizeMode="cover"
              />
              <Text style={styles.sportstext}>{item.sName}</Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No sports data available</Text>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>
            <View style={{ width: "100%", height: "60%" }}>
              <Image
                source={{
                  uri:
                    selectedItem?.sp ||
                    "https://via.placeholder.com/150",
                }}
                style={styles.modalImage}
                resizeMode="cover"
              />
              <Text
                style={{
                  position: "absolute",
                  bottom: 20,
                  alignSelf: "center",
                }}
              >
                {selectedItem?.sName || "No Item"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View>
                <Text style={styles.detailText}>Best At:</Text>
                <Text style={styles.detailText}>Year Playing:</Text>
                <Text style={styles.detailText}>Matches Played:</Text>
              </View>
              <View>
                <Text style={styles.detailText}>{selectedItem?.best}</Text>
                <Text style={styles.detailText}>
                  {selectedItem?.year}
                </Text>
                <Text style={styles.detailText}>{selectedItem?.matches}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sportscontainer: {
    position: "relative",
    width: "100%",
    alignSelf: "center",
    marginTop: -90,
    marginBottom: 100,
    height: wp(30), // Adjust height dynamically
    justifyContent: "center",
  },
  sportsimage1: {
    alignItems: "center",
    justifyContent: "center",
  },
  sportsimage: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(9), // Make it a perfect circle
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  sportstext: {
    marginTop: 5,
    color: theme.colors.secondaryLight,
    textAlign: "center",
    fontSize: theme.fontSizes.sm,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    height: "30%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  detailText: {
    fontSize: wp(4),
    color: "#07001f",
  },
});

export default Sports;

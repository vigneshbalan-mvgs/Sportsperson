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

const Sports = () => {
  const screenWidth = Dimensions.get("window").width; // Get screen width
  const radius = screenWidth / 3; // Set the radius dynamically based on screen width
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    {
      id: 1,
      name: "Cricket",
      bestAt: "Bowler",
      NoOfMatches: 50,
      NoOfYears: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Football",
      bestAt: "Striker",
      NoOfMatches: 120,
      NoOfYears: 5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Tennis",
      bestAt: "Singles",
      NoOfMatches: 30,
      NoOfYears: 3,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Basketball",
      bestAt: "Point Guard",
      NoOfMatches: 75,
      NoOfYears: 4,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Hockey",
      bestAt: "Forward",
      NoOfMatches: 60,
      NoOfYears: 3,
      image: "https://via.placeholder.com/150",
    },
  ];

  const openModal = (item) => {
    if (!item) return;
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.sportscontainer}>
      {data.map((item, index) => {
        const angle = (Math.PI / (data.length - 1)) * index; // Divide the semi-circle into equal parts
        const x = radius * Math.cos(angle); // X-coordinate
        const y = radius * Math.sin(angle); // Y-coordinate (negative for inverted semi-circle)

        return (
          <TouchableOpacity
            key={item.id}
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
              source={{ uri: item.image }}
              style={styles.sportsimage}
              resizeMode="cover"
            />
            <Text style={styles.sportstext}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}

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
                  uri: selectedItem?.image || "https://via.placeholder.com/150",
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
                {selectedItem?.name || "No Item"}
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
              <View style={{}}>
                <Text style={styles.detailText}>Best At:</Text>
                <Text style={styles.detailText}>Number of Matches:</Text>
                <Text style={styles.detailText}>Number of Years:</Text>
              </View>
              <View style={{}}>
                <Text style={styles.detailText}>{selectedItem?.bestAt}</Text>
                <Text style={styles.detailText}>
                  {selectedItem?.NoOfMatches}
                </Text>
                <Text style={styles.detailText}>{selectedItem?.NoOfYears}</Text>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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

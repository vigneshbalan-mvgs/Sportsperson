import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Modal,
  ImageBackground,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  FlatList,
  StatusBar,
} from "react-native";

const mockData = [
  {
    id: "1",
    name: "Gadget Hub",
    description: "The ultimate destination for tech lovers.",
    image: "https://via.placeholder.com/150",
    details:
      "Gadget Hub offers the latest gadgets and tech accessories at unbeatable prices.",
    recentPurchase: "Wireless Earbuds (20 mins ago)",
    address: "123 Tech Street, Silicon Valley",
    mapLink: "https://goo.gl/maps/123techstreet",
    contact: "+1-800-TECHHUB",
    openingHours: "9:00 AM - 9:00 PM",
  },
  {
    id: "2",
    name: "Daily Grocers",
    description: "Fresh groceries and daily essentials.",
    image: "https://via.placeholder.com/150",
    details:
      "Daily Grocers provides farm-fresh produce, dairy products, and household items.",
    recentPurchase: "Fresh Apples (10 mins ago)",
    address: "45 Market Road, Springfield",
    mapLink: "https://goo.gl/maps/45marketroad",
    contact: "+1-555-GROCERY",
    openingHours: "7:00 AM - 10:00 PM",
  },
  {
    id: "3",
    name: "Book Haven",
    description: "A paradise for book lovers.",
    image: "https://via.placeholder.com/150",
    details:
      "Book Haven has a vast collection of books, from fiction to non-fiction and academic resources.",
    recentPurchase: "The Alchemist by Paulo Coelho (5 mins ago)",
    address: "78 Library Lane, Oxford",
    mapLink: "https://goo.gl/maps/78librarylane",
    contact: "+1-444-BOOKS",
    openingHours: "10:00 AM - 8:00 PM",
  },
  {
    id: "4",
    name: "Fashion Fiesta",
    description: "Trendy fashion at great prices.",
    image: "https://via.placeholder.com/150",
    details:
      "Fashion Fiesta brings you the latest in men’s, women’s, and kids’ fashion.",
    recentPurchase: "Men's Jacket - Winter Collection (2 hours ago)",
    address: "22 Style Avenue, Beverly Hills",
    mapLink: "https://goo.gl/maps/22styleavenue",
    contact: "+1-999-FASHION",
    openingHours: "11:00 AM - 10:00 PM",
  },
  {
    id: "5",
    name: "Fitness Factory",
    description: "Your one-stop shop for fitness gear.",
    image: "https://via.placeholder.com/150",
    details:
      "Fitness Factory offers gym equipment, activewear, and supplements to meet all your fitness needs.",
    recentPurchase: "Yoga Mat - Pro Series (1 hour ago)",
    address: "88 Healthy Drive, Fit City",
    mapLink: "https://goo.gl/maps/88healthydrive",
    contact: "+1-333-FITNESS",
    openingHours: "8:00 AM - 8:00 PM",
  },
  {
    id: "6",
    name: "Cuisine Corner",
    description: "Authentic cuisine from around the world.",
    image: "https://via.placeholder.com/150",
    details:
      "Cuisine Corner serves delicious dishes made with love and authenticity.",
    recentPurchase: "Pasta Alfredo - Family Size (30 mins ago)",
    address: "66 Gourmet Way, Foodsville",
    mapLink: "https://goo.gl/maps/66gourmetway",
    contact: "+1-777-CUISINE",
    openingHours: "11:00 AM - 11:00 PM",
  },
];

const Info = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const openModal = (shop) => {
    setSelectedShop(shop);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedShop(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      />
      <View style={styles.overlay}>
        <Text style={styles.shopName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ marginTop: 10 }}
        data={mockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      {selectedShop && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ImageBackground
                source={{ uri: selectedShop.image }}
                style={styles.modalImage}
                imageStyle={{ borderRadius: 15 }}
              />
              <Text style={styles.modalTitle}>{selectedShop.name}</Text>
              <Text style={styles.modalDetails}>{selectedShop.details}</Text>

              <Text style={styles.modalDetails}>
                Address: {selectedShop.address}
              </Text>
              <Pressable onPress={() => Linking.openURL(selectedShop.mapLink)}>
                <Text style={[styles.modalDetails, styles.link]}>
                  View on Google Maps
                </Text>
              </Pressable>
              <Text style={styles.modalDetails}>
                Contact: {selectedShop.contact}
              </Text>
              <Text style={styles.modalDetails}>
                Opening Hours: {selectedShop.openingHours}
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* <StatusBar barStyle="dark-content" /> */}
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "90%",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "#fff",
    elevation: 3,
  },
  image: {
    height: 150,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  shopName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    width: "90%",
    alignItems: "center",
  },
  modalImage: {
    height: 200,
    width: "100%",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: "#3498db",
    textDecorationLine: "underline",
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

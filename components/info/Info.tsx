import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "@/const/colors";
import { faker } from "@faker-js/faker";
import { router } from "expo-router";

const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i.toString(),
      name: faker.company.name(),
      description: faker.commerce.productAdjective(),
      image: faker.image.url(),
      details: faker.lorem.sentences(2),
      recentPurchase: faker.commerce.product(),
      address: `${faker.location.buildingNumber()}, ${faker.location.street()}`,
      mapLink: "https://maps.google.com",
      contact: faker.phone.number(),
      openingHours: `${faker.number.int({ min: 8, max: 12 })}:00 AM - ${faker.number.int(
        {
          min: 1,
          max: 12,
        },
      )}:00 PM`,
    });
  }
  return data;
};

const Info = () => {
  const [shopData, setShopData] = useState([]);

  // Dropdown logic
  const [isFocusCategory, setIsFocusCategory] = useState(false);
  const [isFocusRegion, setIsFocusRegion] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const categoriesData = [
    { label: "Electronics", value: "electronics" },
    { label: "Fashion", value: "fashion" },
    { label: "Sports", value: "sports" },
    { label: "Books", value: "books" },
  ];

  const regionData = [
    { label: "Silicon Valley", value: "silicon_valley" },
    { label: "New York", value: "new_york" },
    { label: "Los Angeles", value: "los_angeles" },
    { label: "Chicago", value: "chicago" },
  ];

  useEffect(() => {
    setShopData(generateMockData());
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push("/info/InfoDetails")}
    >
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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Dropdown for Categories */}
        <Dropdown
          style={[
            styles.inputField,
            isFocusCategory && { borderColor: colors.primary },
          ]}
          data={categoriesData}
          labelField="label"
          valueField="value"
          placeholder={!isFocusCategory ? "Select Category" : "..."}
          value={selectedCategory}
          onFocus={() => setIsFocusCategory(true)}
          onBlur={() => setIsFocusCategory(false)}
          onChange={(item) => {
            setSelectedCategory(item.value);
            setIsFocusCategory(false);
          }}
        />

        {/* Dropdown for Regions */}
        <Dropdown
          style={[
            styles.inputField,
            isFocusRegion && { borderColor: colors.primary },
          ]}
          data={regionData}
          labelField="label"
          valueField="value"
          placeholder={!isFocusRegion ? "Select Region" : "..."}
          value={selectedRegion}
          onFocus={() => setIsFocusRegion(true)}
          onBlur={() => setIsFocusRegion(false)}
          onChange={(item) => {
            setSelectedRegion(item.value);
            setIsFocusRegion(false);
          }}
        />
      </View>

      <FlatList
        style={{ marginTop: 10 }}
        data={shopData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: "100%",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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
  inputField: {
    marginTop: 10,
    width: "48%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

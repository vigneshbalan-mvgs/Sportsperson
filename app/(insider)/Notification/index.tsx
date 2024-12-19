import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import { useRouter } from "expo-router";
import constStyles from "@/const/Styles";
import BackButton from "@components/back";
import useFetchWithToken from "@/const/fetch";
import { PORT } from "@/const/PORT";

const routes = [
  "/(insider)/profile",
  "/(insider)/Teambuild/CheckTeams",
  "/(insider)/(tabs)/Messages/",
  "/(insider)/(tabs)/Community/",
  "/(insider)/(tabs)/Map/",
];

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [clickedId, setClickedId] = useState(null); // Track clicked notification ID
  const router = useRouter();
  const { data, loading, error } = useFetchWithToken(
    `${PORT}/api/auth/notification`,
    "GET",
  );
  console.log(data, loading, error);

  useEffect(() => {
    // Generate random notifications with routes
    const fakeData = Array.from({ length: 20 }, (_, index) => ({
      id: index.toString(),
      Heading: faker.hacker.noun() + " is Ready",
      Message: faker.lorem.sentence(),
      Timing: `${faker.string.numeric()} min ago`,
      route: randomRoute(), // Randomize a route
    }));

    setNotifications(fakeData);
  }, []);

  // Randomly select a route
  const randomRoute = () => {
    const randomIndex = Math.floor(Math.random() * routes.length);
    return routes[randomIndex];
  };

  const removeNotification = (item) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== item.id,
    );
    setNotifications(updatedNotifications);
  };

  const handleItemPress = (item) => {
    setClickedId(item.id); // Set clicked ID to show visual feedback
    setTimeout(() => {
      setClickedId(null); // Reset clicked state after navigation delay
      router.push({ pathname: item.route, params: { item } });
    }, 100); // Simulate quick navigation delay
  };

  const renderItem = ({ item }) => {
    const isClicked = clickedId === item.id; // Check if the item was clicked

    return (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={[styles.content, { opacity: isClicked ? 0.5 : 1 }]} // Change opacity
      >
        <View style={styles.headingContainer}>
          <Text style={styles.texthead}>{item.Heading}</Text>
          <TouchableOpacity onPress={() => removeNotification(item)}>
            <AntDesign
              name="close"
              size={18}
              color="red"
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.textmessage}>{item.Message}</Text>
        <Text style={styles.texttime}>{item.Timing}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={constStyles.container}>
      <BackButton />
      <View style={styles.subContainer1}>
        <Text style={styles.headtext}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.subContainer2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  subContainer1: {
    marginBottom: 10,
    alignItems: "center",
  },
  headtext: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subContainer2: { marginTop: 30 },
  content: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 1,
    marginBottom: 10,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  texthead: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  textmessage: {
    marginTop: 5,
    fontSize: 12,
    color: "#555555",
  },
  texttime: {
    textAlign: "right",
    color: "gray",
    fontSize: 10,
  },
  icons: {
    alignSelf: "center",
  },
});

export default NotificationScreen;

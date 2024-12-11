import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/const/colors";
import {
  AntDesign,
  Ionicons,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import Button from "@components/Button";
import * as SecureStore from "expo-secure-store";

const OverlayDrawer: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300)); // Initial slide position (off-screen)
  const router = useRouter();

  const handleOpenMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to the screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 300, // Slide off-screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false)); // Close the menu after animation
  };

  const handleNavigation = (route: string) => {
    handleCloseMenu(); // Close the menu
    console.log(`Navigating to ${route}`);
    router.push(route); // Navigate to the selected route
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleLogout = () => {
    setLoading(true); // Show loading spinner
    Alert.alert(
      "Are you sure?",
      "Do you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setTimeout(async () => {
              await SecureStore.deleteItemAsync("isLoggedIn");
              await SecureStore.deleteItemAsync("token");
              auth().signOut();
              router.replace("/login");
              setLoading(false);
            }, 300);
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Button */}
      <TouchableOpacity onPress={handleOpenMenu} style={styles.hamburgerButton}>
        <FontAwesome6 name="bars" size={24} color={colors.text} />
      </TouchableOpacity>

      {/* Overlay Drawer */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={handleCloseMenu}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
          >
            <Text style={styles.drawerTitle}>Menu</Text>
            {/* Drawer Options */}
            <Pressable
              style={styles.drawerOption}
              onPress={() =>
                handleNavigation("/(insider)/profile/PersonalDetails")
              }
            >
              <Text style={styles.drawerText}>Personal Details</Text>
              <AntDesign name="right" size={20} color={colors.primary} />
            </Pressable>
            <Pressable
              style={styles.drawerOption}
              onPress={() => handleNavigation("/(insider)/profile/Sports/")}
            >
              <Text style={styles.drawerText}>Sports Profile</Text>
              <AntDesign name="right" size={20} color={colors.primary} />
            </Pressable>
            <Pressable
              style={styles.drawerOption}
              onPress={() => handleNavigation("/(insider)/profile/Athletics/")}
            >
              <Text style={styles.drawerText}>Athletics Profile</Text>
              <AntDesign name="right" size={20} color={colors.primary} />
            </Pressable>
            <Pressable
              style={styles.drawerOption}
              onPress={() =>
                handleNavigation("/(insider)/profile/CommercialProfile")
              }
            >
              <Text style={styles.drawerText}>Commercial Profile</Text>
              <AntDesign name="right" size={20} color={colors.primary} />
            </Pressable>
            <Pressable
              style={styles.drawerOption}
              onPress={() =>
                handleNavigation("/(insider)/profile/TermsAndConditions")
              }
            >
              <Text style={styles.drawerText}>Terms & Conditions</Text>
              <AntDesign name="right" size={20} color={colors.primary} />
            </Pressable>

            <Pressable
              style={styles.drawerOption}
              onPress={() =>
                handleNavigation("/(insider)/profile/Notification")
              }
            >
              <Text style={styles.drawerText}>Notifications</Text>
              <AntDesign name="right" size={20} color={colors.primary} />
            </Pressable>
            {/**/}
            {/* <Pressable */}
            {/*   style={styles.drawerOption} */}
            {/*   onPress={() => handleNavigation("/settings")} */}
            {/* > */}
            {/*   <Text style={styles.drawerText}>Sharing</Text> */}
            {/*   <AntDesign name="right" size={20} color={colors.primary} /> */}
            {/* </Pressable> */}
            {/**/}
            <Pressable style={styles.closeButton} onPress={handleCloseMenu}>
              <MaterialCommunityIcons
                name="close"
                size={30}
                color={colors.primary}
              />
            </Pressable>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                color={colors.primary}
              />
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburgerButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 50,
  },
  hamburgerLine: {
    width: 30,
    height: 3,
    backgroundColor: "#07001f",
    marginVertical: 3,
    borderRadius: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Faded background
    justifyContent: "flex-end",
  },
  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    paddingTop: 100,
  },
  drawerTitle: {
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 20,
  },
  drawerOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    position: "absolute",
    backgroundColor: colors.background,
    borderRadius: 50,
    padding: 10,
    top: 20,
    left: 20,
    elevation: 2,
  },
  logoutButton: {
    position: "absolute",
    backgroundColor: colors.background,
    borderRadius: 50,
    padding: 10,
    bottom: 20,
    left: 20,
    elevation: 2,
  },
  drawerText: {
    fontSize: 16,
    color: colors.text,
  },
  closeText: {
    color: "tomato",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default OverlayDrawer;

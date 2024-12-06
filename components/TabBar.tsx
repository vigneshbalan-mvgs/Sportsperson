import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { colors } from "../const/colors";
import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function TabBarComponent({ state, descriptors, navigation }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showTabBar, setShowTabBar] = useState(true); // New state to toggle TabBar visibility

  // Listen for keyboard events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Icons for each tab
  const icons = {
    Home: (props) => (
      <Ionicons name="home-sharp" size={24} color={props.color} />
    ),
    Map: (props) => (
      <AntDesign name="enviromento" size={23} color={props.color} />
    ),
    Messages: (props) => (
      <AntDesign name="message1" size={23} color={props.color} />
    ),
    Community: (props) => (
      <FontAwesome6 name="users" size={23} color={props.color} />
    ),
    Add: (props) => (
      <AntDesign name="plus" size={31} color={colors.textWhite} />
    ),
  };

  const defaultIcon = (props) => (
    <AntDesign name="home" size={23} color={props.color} />
  );

  const scaleAnims = state.routes.map(
    () => useRef(new Animated.Value(1)).current,
  );

  const handleIconAnimation = (index) => {
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Function to toggle the TabBar visibility
  const toggleTabBar = () => {
    setShowTabBar((prevState) => !prevState);
  };

  // Don't render the TabBar if the keyboard is visible or if we manually toggle to hide it
  if (!showTabBar || keyboardVisible) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const IconComponent = icons[route.name] || defaultIcon;
        const isAddButton = route.name === "Add";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }

          handleIconAnimation(index);

          if (route.name === "Add") {
            handleIconAnimation(index);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBarItem, isAddButton && styles.addButton]}
            key={route.key}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleAnims[index] }] }}
            >
              <IconComponent
                color={isFocused ? colors.primary : colors.secondary}
              />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 23,
    width: wp(90),
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 50,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "red",
    borderRadius: 20,
    width: 50,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
});

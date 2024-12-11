import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from "react-native";
import PagerView from "react-native-pager-view";
import { faker } from "@faker-js/faker";
import BackButton from "@components/back";
import { colors } from "@/const/colors";
import Button from "@components/Button";
import { AntDesign } from "@expo/vector-icons";
import constStyles from "@/const/Styles";

const generateFakeUsers = (count) =>
  Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    profile: faker.image.avatar(),
  }));

const currentUser = {
  id: "current_user_id",
  name: "You",
  profile: "https://via.placeholder.com/150",
};

const Follower = () => {
  const [followers, setFollowers] = useState([
    currentUser,
    ...generateFakeUsers(200),
  ]);
  const [following, setFollowing] = useState([
    currentUser,
    ...generateFakeUsers(240),
  ]);
  const [activeTab, setActiveTab] = useState(0); // 0 for Followers, 1 for Following
  const [modalVisible, setModalVisible] = useState(false);
  const [user, serUser] = useState(true);
  const pagerRef = useRef(null); // Ref for PagerView

  const removeUser = (type, userId) => {
    const listUpdater = type === "followers" ? setFollowers : setFollowing;
    const updatedList = (type === "followers" ? followers : following).filter(
      (user) => user.id !== userId,
    );
    listUpdater(updatedList);
  };

  const followerRenderUserItem = (user, type) => (
    <View style={styles.userItem} key={user.id}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: user.profile }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>
      {user.id !== "current_user_id" && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeUser(type, user.id)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const followingRenderUserItem = (user, type) => (
    <View style={styles.userItem} key={user.id}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{ uri: user.profile }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>
      {user.id !== "current_user_id" && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeUser(type, user.id)}
        >
          <Text style={styles.removeButtonText}>unfollow</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const handleTabPress = (tabIndex) => {
    setActiveTab(tabIndex);
    pagerRef.current?.setPage(tabIndex); // Navigate PagerView to the selected tab
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <TouchableOpacity
        style={{ position: "absolute", right: 20, top: 20 }}
        onPress={() => {}}
      >
        <AntDesign name="user" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>User Cheers</Text>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 0 && styles.activeTab]}
          onPress={() => handleTabPress(0)}
        >
          <Text style={activeTab === 0 ? styles.activeTabText : styles.tabText}>
            Followers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 1 && styles.activeTab]}
          onPress={() => handleTabPress(1)}
        >
          <Text style={activeTab === 1 ? styles.activeTabText : styles.tabText}>
            Following
          </Text>
        </TouchableOpacity>
      </View>
      {/* Pager View */}
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerRef} // Attach ref to PagerView
        onPageSelected={(e) => setActiveTab(e.nativeEvent.position)} // Update active tab on swipe
      >
        <View key="0">
          <FlatList
            data={followers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => followerRenderUserItem(item, "followers")}
            initialNumToRender={30}
            removeClippedSubviews={true}
            maxToRenderPerBatch={20}
            windowSize={10}
          />
        </View>
        <View key="1">
          <FlatList
            data={following}
            removeClippedSubviews={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              followingRenderUserItem(item, "following")
            }
            initialNumToRender={10}
            maxToRenderPerBatch={20}
            windowSize={10}
          />
        </View>
      </PagerView>
      {/* Modal for User Profile */}
    </View>
  );
};

export default Follower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primaryMediumOpacity,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  pagerView: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "500",
  },
  removeButton: {
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
});

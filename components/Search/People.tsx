import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
const defaultImage = "../../assets/users/default-1.png";

const People = () => {
  const [showMore, setShowMore] = React.useState(false);
  const peopleData = [
    {
      id: 1,
      name: "Name",
      nickname: "Nick name",
      image: require(defaultImage),
    },
    {
      id: 2,
      name: "Name",
      nickname: "Nick name",
      image: require(defaultImage),
    },
    {
      id: 3,
      name: "Name",
      nickname: "Nick name",
      image: require(defaultImage),
    },
    {
      id: 4,
      name: "Name",
      nickname: "Nick name",
      image: require(defaultImage),
    },
  ];

  const renderPeopleItem = ({ item }) => (
    <View style={styles.peopleItem}>
      <Image source={item.image} style={styles.profileImage} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={showMore ? peopleData : peopleData.slice(0, 3)}
        renderItem={renderPeopleItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {!showMore && (
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setShowMore(true)}
        >
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  peopleItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nickname: {
    fontSize: 14,
  },
});

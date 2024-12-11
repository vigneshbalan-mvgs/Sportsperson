import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import constStyles from "@/const/Styles";
import { colors } from "@/const/colors";
import { router, useRouter } from "expo-router";

const Chat = () => {
  const generateFakeMessage = (type) => ({
    id: faker.number.int(),
    type,
    text: faker.lorem.sentence(),
  });

  const [messages, setMessages] = useState([
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
    generateFakeMessage("sender"),
    generateFakeMessage("receiver"),
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), type: "sender", text: input },
        generateFakeMessage("receiver"),
      ]);
      setInput("");
    }
  };

  return (
    <View style={constStyles.ScreenContainer}>
      {/* Header */}
      <View style={style.userContainer}>
        <View style={style.Leftpart_Container}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Image
            style={style.userImage}
            resizeMode="cover"
            source={require("@/assets/images/contnet.jpg")}
          />
          <Text style={style.label}>User Name</Text>
        </View>
        <TouchableOpacity>
          <AntDesign name="ellipsis1" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Message Container */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={[item.type === "sender" ? style.sender : style.reciver]}>
            {item.text}
          </Text>
        )}
        contentContainerStyle={style.messageContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Container */}
      <View style={style.inputContainer}>
        <TextInput
          style={style.inputfield}
          placeholder="Type your message..."
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={style.button} onPress={sendMessage}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const style = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  Leftpart_Container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  messageContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  sender: {
    alignSelf: "flex-end",
    backgroundColor: colors.primary,
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "70%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  reciver: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    color: "black",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "70%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  inputfield: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

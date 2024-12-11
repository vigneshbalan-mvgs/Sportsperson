import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors, theme } from "@/const/colors";
import { faker } from "@faker-js/faker"; // Import faker

// Generate initial messages with faker
const generateFakeMessages = (numMessages) => {
  const messages = [];
  for (let i = 0; i < numMessages; i++) {
    messages.push({
      id: (i + 1).toString(),
      sender: i % 2 === 0 ? "user" : "friend",
      text: faker.lorem.sentence(),
      type: i % 2 === 0 ? "sent" : "received",
    });
  }
  return messages;
};

const initialMessages = generateFakeMessages(15);

const TeamBuildChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: "user",
      text: inputText,
      type: "sent",
    };
    setMessages([...messages, newMessage]);
    setInputText("");
    setIsTyping(false);
  };

  const handleLongPress = (messageId) => {
    Alert.alert(
      "Message Options",
      "What would you like to do with this message?",
      [
        {
          text: "Delete",
          onPress: () => handleDeleteMessage(messageId),
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId),
    );
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleLongPress(item.id)}
      delayLongPress={500}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.messageContainer,
          item.type === "sent" ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <TouchableOpacity
          onPress={() => router.push("/(insider)/profile/ProfileOthers")}
        >
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.messageBubble,
            item.type === "sent"
              ? styles.sentMessageBubble
              : styles.receivedMessageBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.type === "sent" ? styles.sentText : styles.receivedText,
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.back();
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(insider)/GroupDetailsPage")}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.avatar}
          />
          <Text style={styles.headerText}>Group Name</Text>

          {isTyping && (
            <Text style={styles.typingIndicator}>Friend is typing...</Text>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type something"
          style={styles.input}
          value={inputText}
          numberOfLines={9}
          onChangeText={(text) => {
            setInputText(text);
            setIsTyping(true);
          }}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 5,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  chatContainer: {
    backgroundColor: "#fff",
    padding: 10,
    flexGrow: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    alignSelf: "flex-start",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageBubble: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: theme.br.input,
    padding: 10,
    maxWidth: "65%",
  },
  sentMessageBubble: {
    backgroundColor: colors.primary,
    color: "white",
    borderColor: colors.secondary,
    elevation: 4,
  },
  receivedMessageBubble: {
    backgroundColor: "#fff",
    elevation: 4,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  sentText: {
    color: "white",
  },
  receivedText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
  },
  typingIndicator: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 5,
  },
});

export default TeamBuildChat;

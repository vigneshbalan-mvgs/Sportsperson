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
    // Show an alert with options for long press
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
      onLongPress={() => handleLongPress(item.id)} // Attach the long press event
      delayLongPress={500} // Adjust the delay for long press (optional)
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
            source={{ uri: "https://via.placeholder.com/50" }} // Placeholder for profile picture
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
        <View>
          <Text style={styles.headerText}>Let's start your group chat!</Text>

          {isTyping && (
            <Text style={styles.typingIndicator}>Friend is typing...</Text>
          )}
        </View>
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
  messageText: {
    fontSize: 13,
  },
  sentMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  sentText: {
    color: "white",
  },
  receivedMessage: {
    alignSelf: "flex-start",
  },
  receivedText: {
    color: "#333",
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

const initialMessages = [
  { id: "1", sender: "user", text: "Hi...", type: "sent" },
  { id: "2", sender: "user", text: "Good to see you", type: "sent" },
  {
    id: "3",
    sender: "friend",
    text: "Hi there! Are you into sports?",
    type: "received",
  },
  {
    id: "4",
    sender: "user",
    text: "Absolutely! I love cricket. What about you?",
    type: "sent",
  },
  {
    id: "5",
    sender: "friend",
    text: "I'm a big football fan. Who's your favorite cricketer?",
    type: "received",
  },
  {
    id: "6",
    sender: "user",
    text: "Virat Kohli! His consistency is remarkable. And yours in football?",
    type: "sent",
  },
  {
    id: "7",
    sender: "friend",
    text: "Cristiano Ronaldo. His dedication and skill are unmatched!",
    type: "received",
  },
  {
    id: "8",
    sender: "user",
    text: "True legend! Do you play football or just watch?",
    type: "sent",
  },
  {
    id: "9",
    sender: "friend",
    text: "I play sometimes. Mostly as a striker. What about you?",
    type: "received",
  },
  {
    id: "10",
    sender: "user",
    text: "I play cricket. I'm a middle-order batsman. Do you follow other sports?",
    type: "sent",
  },
  {
    id: "11",
    sender: "friend",
    text: "A bit of basketball and tennis. LeBron James and Federer are incredible. You?",
    type: "received",
  },
  {
    id: "12",
    sender: "user",
    text: "I like tennis too. Rafael Nadal is my favorite. His resilience is inspiring!",
    type: "sent",
  },
  {
    id: "13",
    sender: "friend",
    text: "Great choice! What's your dream sports moment to witness live?",
    type: "received",
  },
  {
    id: "14",
    sender: "user",
    text: "Watching India win another Cricket World Cup at Wankhede. What's yours?",
    type: "sent",
  },
  {
    id: "15",
    sender: "friend",
    text: "Attending a Champions League final with Ronaldo scoring a hat-trick!",
    type: "received",
  },
];

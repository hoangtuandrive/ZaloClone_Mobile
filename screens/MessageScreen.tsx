import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../components/Message/Message";
import MessageInput from "../components/MessageInput/MessageInput";
import { ChatRoom, Message as MessageModel } from "../src/models";
import { DataStore, SortDirection } from "aws-amplify";
import { ActivityIndicator } from "react-native-paper";

export default function MessageScreen() {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messDel, setMessDel] = useState();
  const [messUpdate, setMessUpdate] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  // console.warn("Displaying chat room: ",route.params?.id);

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom, messDel, messUpdate]);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        //apend new message to existing messages
        setMessages((existingMessages) => [msg.element, ...existingMessages]);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "DELETE") {
        setMessDel(msg.element.id);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
      if (msg.model === MessageModel && msg.opType === "UPDATE") {
        setMessUpdate(msg.element.id);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id received");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("No chatroom found with this id");
    } else {
      setChatRoom(chatRoom);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    setMessages(fetchedMessages);
  };

  if (!chatRoom) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  return (
    <View style={styles.page}>
      <FlatList
        inverted //Newest message goes on top of data list --> use inverted
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
      />
      <MessageInput chatRoom={chatRoom}></MessageInput>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

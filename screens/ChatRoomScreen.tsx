import React from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import Message from "../components/Message/Message";
import chatRoomData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput/MessageInput";

export default function ChatRoomScreen() {
  return (
    <SafeAreaView style={styles.page}>
      {/* <Message message={chatRoomData.messages[0]}></Message> */}
      <FlatList
        inverted //Newest message goes on top of data list --> use inverted
        data={chatRoomData.messages}
        renderItem={({ item }) => <Message message={item} />}
      />
      <MessageInput></MessageInput>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

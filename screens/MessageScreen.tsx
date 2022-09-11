import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Message from "../components/Message/Message";
import chatData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput/MessageInput";

export default function MessageScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  // console.warn("Displaying chat room: ",route.params?.id);

  navigation.setOptions({ title: "Elon Musk" });

  return (
    <View style={styles.page}>
      <FlatList
        inverted //Newest message goes on top of data list --> use inverted
        data={chatData.messages}
        renderItem={({ item }) => <Message message={item} />}
      />
      <MessageInput></MessageInput>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

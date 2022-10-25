import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Text,
  Image,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from "react-native";
import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem";
import SearchBar from "../components/SearchBar/SearchBar";
import { ChatRoom, ChatRoomUser } from "../src/models";
import { Auth, DataStore } from "aws-amplify";

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === currentUser.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);
      console.log(chatRooms);
      setChatRooms(chatRooms);
    };

    fetchChatRooms();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={SearchBar}
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Text, Image, StyleSheet, View, FlatList } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem";
import SearchBar from "../components/SearchBar/SearchBar";
import chatRoomsData from "../assets/dummy-data/ChatRooms";

export default function HomeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  // const [chatRoomData, setChatsRoom] = useState(chatRoomsData);

  return (
    <View style={styles.page}>
      <SearchBar></SearchBar>
      <FlatList
        data={chatRoomsData}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

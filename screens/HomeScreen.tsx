import * as React from "react";

import { Text, Image, StyleSheet, View, FlatList } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem";

import chatRoomsData from "../assets/dummy-data/ChatRooms";

export default function HomeScreen() {
  return (
    <View style={styles.page}>
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

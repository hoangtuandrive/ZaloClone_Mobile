import * as React from "react";

import { Text, Image, StyleSheet, View } from "react-native";
import ChatRoomItem from "../components/ChatRoomItem/ChatRoomItem";

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <ChatRoomItem />
      <ChatRoomItem />
      <ChatRoomItem />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

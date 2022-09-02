import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

const blue = "#3777f0";
const grey = "lightgrey";

const myID = "u1";

export default function Message({ message }: { message: any }) {
  const isMe = message.user.id === myID;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
      ]}
    >
      <Text style={{ color: isMe ? "white" : "black" }}>{message.content}</Text>
    </View>
  );
}

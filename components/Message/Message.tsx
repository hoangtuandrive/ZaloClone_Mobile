import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const blue = "#3777f0";
const grey = "lightgrey";

const myID = "u1";

export default function Message({ message }: { message: any }) {
  const isMe = message.user.id === myID;

  return (
    <View style={styles.row}>
      {isMe == false && (
        <Image
          style={styles.image}
          source={{
            uri: "https://static-images.vnncdn.net/files/publish/ty-phu-elon-musk-vua-chi-44-ty-usd-de-mua-lai-twitter-9ff465ee3a124118b8fc9b8e8c9bcb4a.jpg",
          }}
        ></Image>
      )}

      <View
        style={[
          styles.container,
          isMe ? styles.rightContainer : styles.leftContainer,
        ]}
      >
        <Text style={{ color: isMe ? "white" : "black" }}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

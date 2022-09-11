import React, { useEffect } from "react";
import { Text, Image, Pressable, View } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function ChatRoomItem({ chatRoom }: { chatRoom: any }) {
  //props
  // console.log(props);
  // const chatRoom = props.chatRoom;
  // const { chatRoom } = props.chatRoom;
  const user = chatRoom.users[1];

  const navigation = useNavigation();

  // const onPress = () => {
  //   navigation.navigate("ChatRoom", { id: chatRoom.id });
  // };

  return (
    <Pressable
      onPress={() => navigation.navigate("ChatRoom", { id: chatRoom.id })}
      style={styles.container}
    >
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />

      {/* Conditional component rendering */}
      {chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{chatRoom.lastMessage.createdAt}</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {chatRoom.lastMessage.content}
        </Text>
      </View>
    </Pressable>
  );
}

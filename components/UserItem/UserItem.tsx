import React, { useEffect } from "react";
import { Text, Image, Pressable, View } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { DataStore, Auth } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../../src/models";

export default function UserItem({ user }: { user: any }) {
  const navigation = useNavigation();

  const onPress = async () => {
    //Create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    //Connect current user to that chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub); //query by id
    await DataStore.save(
      new ChatRoomUser({
        user: dbUser,
        chatRoom: newChatRoom,
      })
    );

    //Connect clicked user to the chat room
    await DataStore.save(
      new ChatRoomUser({
        user,
        chatRoom: newChatRoom,
      })
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}

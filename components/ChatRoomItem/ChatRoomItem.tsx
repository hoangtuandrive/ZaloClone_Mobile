import React, { useState, useEffect } from "react";
import { Text, Image, Pressable, View, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { ChatRoomUser, User, Message } from "../../src/models";
import { DataStore, Auth } from "aws-amplify";
import moment from "moment";

export default function ChatRoomItem({ chatRoom }: { chatRoom: any }) {
  // const [users, setUsers] = useState<User[]>([]); //all users in 1 chatRoom
  const [user, setUser] = useState<User | null>(null); //to display user
  const [lastMessage, setLastMessage] = useState<Message | undefined>();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedChatRoomUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);
      console.log(fetchedChatRoomUsers);

      // setUsers(fetchedChatRoomUsers);

      //Find other user from current user in that chat room
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedChatRoomUsers.find(
          (user) => user.id !== authUser.attributes.sub
        ) || null
      );
    };
    fetchUsers();
  }, []);

  //get last message from that chatroom, query by id
  useEffect(() => {
    if (!chatRoom.chatRoomLastMessageId) {
      return;
    }
    DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(
      setLastMessage
    );
  }, []);

  const onPress = () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id });
  };

  //get time
  const time = moment(lastMessage?.createdAt).from(moment());

  //Loading
  if (!user) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: chatRoom.imageUri || user?.imageUri }}
        style={styles.image}
      />

      {/* Conditional component rendering */}
      {!!chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={[styles.name, chatRoom.newMessages && styles.bold]}>
            {chatRoom.name || user?.name}
          </Text>
          <Text style={[styles.text, chatRoom.newMessages && styles.bold]}>
            {time}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.text, chatRoom.newMessages && styles.bold]}
        >
          {lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
}

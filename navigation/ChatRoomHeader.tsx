import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ChatRoom, ChatRoomUser, User } from "../src/models";
import { Auth, DataStore } from "aws-amplify";

const ChatRoomHeader = ({ id }) => {
  const { width } = useWindowDimensions();
  // console.log(id);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [chatRoom, setChatRoom] = useState<ChatRoom | undefined>(undefined);

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);

    const authUser = await Auth.currentAuthenticatedUser();
    setUser(
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
  };

  const fetchChatRoom = async () => {
    DataStore.query(ChatRoom, id).then(setChatRoom);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchUsers();
    fetchChatRoom();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: width - 50,
        marginRight: 150,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: chatRoom?.imageUri || user?.imageUri,
        }}
        style={{ width: 40, height: 40, borderRadius: 40 }}
      />
      <Text
        style={{
          flex: 1,
          color: "black",
          fontWeight: "bold",
          marginLeft: 20,
          fontSize: 20,
        }}
      >
        {chatRoom?.name || user?.name}
      </Text>
      <Ionicons
        name="call-outline"
        size={24}
        color="blue"
        style={{ marginHorizontal: 5 }}
      />
      {/* <AntDesign
          name="videocamera"
          size={24}
          color="blue"
          style={{ marginHorizontal: 5 }}
        /> */}
      <AntDesign
        name="infocirlceo"
        size={24}
        color="blue"
        style={{ marginHorizontal: 20 }}
      />
    </View>
  );
};

export default ChatRoomHeader;

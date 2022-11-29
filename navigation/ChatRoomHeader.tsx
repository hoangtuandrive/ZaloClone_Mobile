import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ChatRoom, ChatRoomUser, User, Message } from "../src/models";
import { Auth, DataStore } from "aws-amplify";
import { useNavigation } from "@react-navigation/core";
import { S3Image } from "aws-amplify-react-native";

const ChatRoomHeader = ({ id }) => {
  const { width } = useWindowDimensions();
  // console.log(id);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatRoom, setChatRoom] = useState<ChatRoom | undefined>(undefined);

  const navigation = useNavigation();

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);

    const authUser = await Auth.currentAuthenticatedUser();
    setUser(
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
    setCurrentUser(authUser);
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

  const getLastOnlineText = () => {
    return "online";
  };

  //Group

  const getUsernames = () => {
    return allUsers.map((user) => user.name).join(", ");
  };

  const openInfo = () => {
    // redirect to info page
    navigation.navigate("GroupInfoScreen", { id });
  };

  const VideoCall = async () => {
    await DataStore.save(
      new Message({
        content: "Video Call",
        userID: currentUser?.attributes.sub,
        chatroomID: chatRoom?.id,
      })
    );
  };

  const isGroup = allUsers.length > 2;

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
      <S3Image
        imgKey={chatRoom?.imageUri || user?.imageUri}
        style={{ width: 40, height: 40, borderRadius: 40 }}
        resizeMode="contain"
      />
      {/* <Image
        source={{
          uri: chatRoom?.imageUri || user?.imageUri,
        }}
        style={{ width: 40, height: 40, borderRadius: 40 }}
      /> */}
      <Pressable onPress={openInfo} style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>
          {chatRoom?.name || user?.name}
        </Text>
        <Text numberOfLines={1}>
          {isGroup ? getUsernames() : getLastOnlineText()}
        </Text>
      </Pressable>
      <Ionicons
        name="call-outline"
        size={24}
        color="blue"
        style={{ marginHorizontal: 5 }}
        onPress={() => {
          VideoCall();
        }}
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

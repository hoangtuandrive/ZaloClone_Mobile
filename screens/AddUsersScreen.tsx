import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import UserItem from "../components/UserItem/UserItem";
import NewGroupButton from "../components/NewGroupButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../src/models";
import SearchBar from "../components/SearchBar/SearchBar";

export default function AddUsersScreen() {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isNewGroup, setIsNewGroup] = useState(true);
  const route = useRoute();

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  useEffect(() => {
    fetchChatRoom();
  }, []);

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No chatroom id provided");
      return;
    }
    const chatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!chatRoom) {
      console.error("Couldn't find a chat room with this id");
    } else {
      setChatRoom(chatRoom);
    }
    // console.log(chatRoom);
  };

  // useEffect(() => {
  //   // query users
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   };
  //   fetchUsers();
  // }, [])

  // const addUserToChatRoom = async (user, chatRoom) => {
  //   DataStore.save(
  //     ChatRoom.copyOf(chatRoom, (updatedChatRoom) => {
  //       updatedChatRoom.ChatRoomUsers += user;
  //     })
  //   );
  // };

  const addUserToChatRoom = async (user) => {
    const chatRoom1 = await DataStore.query(ChatRoom, route.params?.id);
    const chatRoomUser = chatRoom1?.ChatRoomUsers;
    const chatRoom2 = await DataStore.save(
      new ChatRoomUser({
        user: user,
        chatRoom: chatRoom,
      })
    );
    console.log("Current chatroom: ");
    console.log(chatRoom1);
    console.log("New chatroomuser: ");
    console.log(chatRoom2);
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem user={item} onPress={() => addUserToChatRoom(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <SearchBar></SearchBar>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    backgroundColor: "#3777f0",
    marginHorizontal: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

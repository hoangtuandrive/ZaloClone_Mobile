import { useRoute } from "@react-navigation/native";
import { DataStore, Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
// import { FlatList } from "react-native-gesture-handler";
import UserItem from "../../components/UserItem/UserItem";
import { ChatRoom, User, ChatRoomUser } from "../../src/models";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const GroupInfoScreen = () => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const route = useRoute();

  useEffect(() => {
    fetchChatRoom();
    fetchUsers();
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
  };

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === route.params?.id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);
  };

  const confirmDelete = async (user) => {
    // check if Auth user is admin of this group
    const authData = await Auth.currentAuthenticatedUser();
    if (chatRoom?.Admin?.id !== authData.attributes.sub) {
      Alert.alert("You are not the admin of this group");
      return;
    }

    if (user.id === chatRoom?.Admin?.id) {
      Alert.alert("You are the admin, you cannot delete yourself");
      return;
    }

    Alert.alert(
      "Confirm delete",
      `Are you sure you want to delete ${user.name} from the group`,
      [
        {
          text: "Delete",
          onPress: () => deleteUser(user),
          style: "destructive",
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const deleteUser = async (user) => {
    const chatRoomUsersToDelete = await (
      await DataStore.query(ChatRoomUser)
    ).filter(
      (cru) => cru.chatRoom.id === chatRoom?.id && cru.user.id === user.id
    );

    console.log(chatRoomUsersToDelete);

    if (chatRoomUsersToDelete.length > 0) {
      await DataStore.delete(chatRoomUsersToDelete[0]);

      setAllUsers(allUsers.filter((u) => u.id !== user.id));
    }
  };

  const changRoomName = async () => {
    console.log("changeRoomName1");
    DataStore.save(
      ChatRoom.copyOf(chatRoom, (updatedName) => {
        updatedName.name = roomName;
      })
    );
    console.log("changeRoomName");
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.root}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Change Room Name: </Text>
            <TextInput
              style={styles.modalText}
              numberOfLines={1}
              onChangeText={(text) => setRoomName(text)}
            >
              {chatRoom?.name}
            </TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => changRoomName()}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={{ flexDirection: "row" }}>
        <Text style={styles.title}>{chatRoom?.name}</Text>
        <Ionicons
          name="pencil"
          size={32}
          color="black"
          style={{ marginLeft: 20 }}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </Pressable>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Users ({allUsers.length})</Text>
        <AntDesign
          name="adduser"
          size={32}
          color="black"
          style={{ marginLeft: 20 }}
        />
      </View>

      <FlatList
        data={allUsers}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            isAdmin={chatRoom?.Admin?.id === item.id}
            onLongPress={() => confirmDelete(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    paddingHorizontal: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
});

export default GroupInfoScreen;

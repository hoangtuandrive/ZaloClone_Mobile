import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Text,
  Image,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from "react-native";
import { DataStore } from "aws-amplify";
import UserItem from "../components/UserItem/UserItem";
import SearchBar from "../components/SearchBar/SearchBar";
import { User } from "../src/models";

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);

  // useEffect(() => {
  //   // query users
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //   };
  //   fetchUsers();
  // }, [])

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={SearchBar}
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

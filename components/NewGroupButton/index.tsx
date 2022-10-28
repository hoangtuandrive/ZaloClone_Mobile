import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, View, Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

const NewGroupButton = ({ onPress }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <View>
      <Searchbar
        style={styles.bar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        iconColor="white"
        inputStyle={{ color: "white" }}
        placeholderTextColor="white"
        clearIcon={clearIcon}
      />
      <Pressable onPress={onPress}>
        <View
          style={{ flexDirection: "row", padding: 10, alignItems: "center" }}
        >
          <FontAwesome name="group" size={24} color="#4f4f4f" />
          <Text style={{ marginLeft: 10, fontWeight: "bold" }}>New group</Text>
        </View>
      </Pressable>
    </View>
  );
};

const clearIcon = () => {
  return (
    <View>
      <MaterialIcons name="close" size={24} color="white" />
    </View>
  );
};

export default NewGroupButton;

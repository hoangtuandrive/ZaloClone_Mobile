import * as React from "react";
import { Searchbar } from "react-native-paper";
import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

const SearchBar = () => {
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
    </View>
  );
};

export default SearchBar;

const clearIcon = () => {
  return (
    <View>
      <MaterialIcons name="close" size={24} color="white" />
    </View>
  );
};

// https://blog.jscrambler.com/add-a-search-bar-using-hooks-and-flatlist-in-react-native

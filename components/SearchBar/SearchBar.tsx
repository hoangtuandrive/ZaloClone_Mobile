import * as React from "react";
import { Searchbar } from "react-native-paper";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
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

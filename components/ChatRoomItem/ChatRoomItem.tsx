import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import styles from "./styles";

export default function ChatRoomItem() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://i.pinimg.com/564x/42/b8/f9/42b8f9fc9758de0176c690ada3e00fd6.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>4</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>Anya Forger</Text>
          <Text style={styles.text}>11:11 AM</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          Hello World this is a long message helo hello
        </Text>
      </View>
    </View>
  );
}

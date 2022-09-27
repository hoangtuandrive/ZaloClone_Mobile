import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Auth } from "aws-amplify";

export default function InfoScreen() {
  const signOut = () => {
    Auth.signOut();
    console.log("signOut clicked");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: "https://news.taihen.vn/wp-content/uploads/sites/2/2022/05/Anya-Forger-1-758x379.jpg",
        }}
        style={styles.anh}
      />
      <View style={styles.Top}>
        <TouchableOpacity style={styles.Top_content}>
          <Text style={styles.Top_contentText}>Thuan Le</Text>
          <View>
            <AntDesign name="edit" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity style={styles.btn_DoiMk}>
          <Text style={styles.btn_DoiMkText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_DangXuat} onPress={signOut}>
          <Text style={styles.btn_DangXuatText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  anh: {
    width: 113,
    height: 96,
    borderRadius: 50,
    top: 74,
  },
  Top: {
    flex: 1,
    top: 100,
    flexDirection: "row",
  },
  Top_content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  Top_contentText: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    textAlign: "center",
    paddingRight: 40,
  },
  btn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  btn_DoiMk: {
    backgroundColor: "#E3C000",
    width: 194,
    height: 67,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_DoiMkText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  btn_DangXuat: {
    backgroundColor: "#E3C000",
    width: 194,
    height: 67,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  btn_DangXuatText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
});

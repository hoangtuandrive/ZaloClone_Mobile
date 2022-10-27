import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useReducer } from "react";
import { Auth, container, DataStore, Storage } from "aws-amplify";
import { User } from "../src/models";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { S3Image } from "aws-amplify-react-native";

export default function InfoScreen() {
  const [currentUser, setCurrentUsers] = useState<User>();
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }

  const signOut = () => {
    Auth.signOut();
  };

  useEffect(() => {
    const fetchUser = async () => {
      const currentUserCognito = await Auth.currentAuthenticatedUser();
      setEmail(currentUserCognito.attributes.email);
      const dbUser = await DataStore.query(
        User,
        currentUserCognito.attributes.sub
      );
      setCurrentUsers(dbUser);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();

        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const getBlob = async (uri: string) => {
    const respone = await fetch(uri);
    const blob = await respone.blob();
    return blob;
  };

  // how many byte uploaded
  const progressCallback = (progress) => {
    setProgress(progress.loaded / progress.total);
  };

  const changeImage = async () => {
    console.log("Test");
    takePhoto();
    if (!image) {
      return;
    }
    const blob = await getBlob(image);
    const { key } = await Storage.put(`${uuidv4()}.png`, blob, {
      progressCallback,
    });
    console.log("takeImage");

    // set image uri
    const user = await DataStore.query(User, currentUser?.id);
    const setImage = async () => {
      DataStore.save(
        User.copyOf(user, (updatedImage) => {
          updatedImage.imageUri = key;
        })
      );
      console.log("setImage");
    };
    setImage();
    handleClick();
  };
  return (
    <SafeAreaView style={styles.container}>
      <S3Image
        imgKey={currentUser?.imageUri}
        style={styles.anh}
        resizeMode="contain"
      />
      <View style={styles.Top}>
        <TouchableOpacity style={styles.Top_content}>
          <Text style={styles.Top_contentText}>{currentUser?.name}</Text>
          <View>
            <AntDesign name="edit" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.Top}>
        <TouchableOpacity style={styles.Top_content}>
          <Text style={styles.Top_contentText}>{email}</Text>
          {/* <View>
            <AntDesign name="edit" size={24} color="black" />
          </View> */}
        </TouchableOpacity>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          onPress={changeImage}
          style={[styles.btn_DoiMk, { marginBottom: 20 }]}
        >
          <Text style={styles.btn_DoiMkText}>Change Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_DoiMk}>
          <Text style={styles.btn_DoiMkText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_DangXuat} onPress={signOut}>
          <Text style={styles.btn_DangXuatText}>Sign Out</Text>
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
  },
  btn: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  btn_DoiMk: {
    backgroundColor: "#1877F2",
    width: 340,
    height: 67,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_DoiMkText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  btn_DangXuat: {
    backgroundColor: "#1877F2",
    width: 340,
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
    color: "white",
  },
});

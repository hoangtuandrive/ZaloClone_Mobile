import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import styles from "./styles";
import { DataStore, Auth, Storage } from "aws-amplify";
import { User } from "../../src/models";
import { ActivityIndicator } from "react-native-paper";
import { useWindowDimensions } from "react-native";
import { S3Image } from "aws-amplify-react-native";
import AudioPlayer from "../AudioPlayer";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

export default function Message({ message }: { message: any }) {
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);
  const [soundURI, setSoundURI] = useState<any>(null);
  const [videoCall, setVideoCall] = useState<boolean>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) {
        return;
      }
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user.id === authUser.attributes.sub);
    };
    checkIfMe();
  }, [user]);

  useEffect(() => {
    if (message.audio) {
      Storage.get(message.audio).then(setSoundURI);
    }
  }, [message]);
  useEffect(() => {
    if (message.content === "Video Call") {
      setVideoCall(true);
    }
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

  if (!user) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [9, 16],
    });
  };

  // get time
  const time = moment(message.createdAt).format("dddd, MMM D, h:mm a");

  return (
    <View style={styles.row}>
      {isMe == false && (
        <S3Image
          style={styles.image}
          // //ignore
          // source={{
          //   uri: null || user?.imageUri,
          // }}
          imgKey={null || user?.imageUri}
          // style={{ width: width * 0.65, aspectRatio: 4 / 3 }}
          resizeMode="contain"
        ></S3Image>
      )}

      <View
        style={[
          styles.container,
          isMe ? styles.rightContainer : styles.leftContainer,
        ]}
      >
        {message.image && (
          <View style={{ marginBottom: message.content ? 10 : 0 }}>
            <S3Image
              imgKey={message.image}
              style={{ width: width * 0.65, aspectRatio: 4 / 3 }}
              resizeMode="contain"
            />
          </View>
        )}
        {soundURI && <AudioPlayer soundURI={soundURI} />}
        {message.file && (
          <View style={{ maxWidth: "100%", flexDirection: "row" }}>
            <Ionicons
              name="document-text-outline"
              size={32}
              style={{
                color: isMe ? "white" : "black",
              }}
            />
            <Text
              style={{
                color: isMe ? "white" : "black",
                marginBottom: 15,
              }}
            >
              {message.file}
            </Text>
            {/* <MaterialIcons
              name="file-download"
              size={32}
              style={{
                color: isMe ? "white" : "black",
              }}
            /> */}
          </View>
        )}
        {videoCall && (
          <TouchableOpacity
            style={{
              flexDirection: "column",
              paddingRight: 10,
              paddingLeft: 5,
            }}
            onPress={() => {
              takePhoto();
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: isMe ? "white" : "black",
                  alignSelf: "center",
                }}
              >
                Video call in progress:
              </Text>
              <View style={{ marginLeft: 10 }}>
                <View
                  style={{
                    backgroundColor: "green",
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <AntDesign name="phone" size={24} color="white" />
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                      marginLeft: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Join
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ color: isMe ? "white" : "black", marginTop: 5 }}>
              {time}
            </Text>
          </TouchableOpacity>
        )}
        {!videoCall && (
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: isMe ? "white" : "black" }}>
              {message.content}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: isMe ? "white" : "black" }}>{time}</Text>
              <Ionicons
                name="checkmark-outline"
                size={16}
                style={{ color: isMe ? "white" : "black", marginLeft: 10 }}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

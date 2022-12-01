import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import styles from "./styles";
import { DataStore, Auth, Storage } from "aws-amplify";
import { User, Message as MessageModel } from "../../src/models";
import { ActivityIndicator } from "react-native-paper";
import { useWindowDimensions } from "react-native";
import { S3Image } from "aws-amplify-react-native";
import AudioPlayer from "../AudioPlayer";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import moment from "moment";

export default function Message({ message: messageProp }: { message: any }) {
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);
  const [soundURI, setSoundURI] = useState<any>(null);
  const [videoCall, setVideoCall] = useState<boolean>();
  const { showActionSheetWithOptions } = useActionSheet();
  const { width } = useWindowDimensions();
  const [message, setMessage] = useState<MessageModel>(messageProp);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    DataStore.query(User, messageProp.userID).then(setUser);
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
    if (messageProp.audio) {
      Storage.get(messageProp.audio).then(setSoundURI);
    }
  }, [messageProp]);
  useEffect(() => {
    if (messageProp.content === "Video Call") {
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

  const recallMessage = async () => {
    await DataStore.save(
      MessageModel.copyOf(messageProp, (updated) => {
        updated.content = "[message recalled]";
        updated.image = null;
        updated.file = null;
        updated.audio = null;
      })
    );
  };

  const confirmRecall = () => {
    Alert.alert(
      "Confirm recall",
      "Are you sure you want to recall the message?",
      [
        {
          text: "Recall",
          onPress: recallMessage,
          style: "destructive",
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const deleteMessage = async () => {
    await DataStore.delete(messageProp);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete the message?",
      [
        {
          text: "Delete",
          onPress: deleteMessage,
          style: "destructive",
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  const onActionPress = (index) => {
    if (index === 1) {
      console.log("Recall");
      confirmRecall();
    } else if (index === 0) {
      if (isMe) {
        confirmDelete();
      } else {
        Alert.alert("Can't delete", "This is not your message");
      }
    }
  };

  const openActionMenu = () => {
    const options = ["Delete", "Recall", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
        cancelButtonIndex,
      },
      onActionPress
    );
  };

  // get time
  const time = moment(messageProp.createdAt).format("dddd, MMM D, h:mm a");

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

      <Pressable
        onLongPress={openActionMenu}
        onPress={openActionMenu}
        style={[
          styles.container,
          isMe ? styles.rightContainer : styles.leftContainer,
          { width: soundURI ? "75%" : "auto" },
        ]}
      >
        {messageProp.image && (
          <View style={{ marginBottom: messageProp.content ? 10 : 0 }}>
            <S3Image
              imgKey={messageProp.image}
              style={{ width: width * 0.65, aspectRatio: 4 / 3 }}
              resizeMode="contain"
            />
          </View>
        )}
        {soundURI && <AudioPlayer soundURI={soundURI} />}
        {messageProp.file && (
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
              {messageProp.file}
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
              {messageProp.content}
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
      </Pressable>
      {isMe == true && (
        <S3Image
          style={styles.imageRight}
          // //ignore
          // source={{
          //   uri: null || user?.imageUri,
          // }}
          imgKey={null || user?.imageUri}
          // style={{ width: width * 0.65, aspectRatio: 4 / 3 }}
          resizeMode="contain"
        ></S3Image>
      )}
    </View>
  );
}

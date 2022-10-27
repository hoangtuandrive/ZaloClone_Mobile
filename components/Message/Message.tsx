import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { DataStore, Auth, Storage } from "aws-amplify";
import { User } from "../../src/models";
import { ActivityIndicator } from "react-native-paper";
import { useWindowDimensions } from "react-native";
import { S3Image } from "aws-amplify-react-native";
import AudioPlayer from "../AudioPlayer";

export default function Message({ message }: { message: any }) {
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);
  const [soundURI, setSoundURI] = useState<any>(null);
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

  if (!user) {
    return <ActivityIndicator></ActivityIndicator>;
  }

  return (
    <View style={styles.row}>
      {isMe == false && (
        <Image
          style={styles.image}
          //ignore
          source={{
            uri: null || user?.imageUri,
          }}
        ></Image>
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

        <Text style={{ color: isMe ? "white" : "black" }}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

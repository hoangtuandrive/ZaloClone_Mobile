import * as React from "react";
import LoginScreen, { SocialButton } from "react-native-login-screen";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import Swiper from "react-native-swiper";

export default function Login() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Home");
  };
  return (
    <Swiper>
      <View style={styles.slide1}>
        <Image
          style={styles.logo}
          source={require("../assets/images/fb-messenger.png")}
        ></Image>
        <Text style={styles.title}>Messenger</Text>
      </View>
      <View style={styles.page}>
        <LoginScreen
          style={styles.login}
          emailPlaceholder="Email"
          passwordPlaceholder="Password"
          logoImageSource={require("../assets/images/fb-messenger.png")}
          onLoginPress={onPress}
          onSignupPress={() => {}}
          onEmailChange={(email: string) => {}}
          logoImageStyle={styles.image}
          onPasswordChange={(password: string) => {}}
        >
          <SocialButton
            text="Continue with Facebook"
            imageSource={require("../assets/images/facebook.png")}
            onPress={() => {}}
            style={styles.button}
            textContainerStyle={styles.text}
          />
          <SocialButton
            text="Continue with Google"
            imageSource={require("../assets/images/google.png")}
            onPress={() => {}}
            style={styles.button}
            textContainerStyle={styles.text}
          />
        </LoginScreen>
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  login: {
    backgroundColor: "white",
    justifyContent: "center",
  },
  image: {
    marginTop: 20,
    margin: 10,
    flex: 1,
    maxHeight: 80,
    maxWidth: 80,
  },
  button: {
    margin: 10,
    alignItems: "center",
  },
  first: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5aa8e8",
  },
  text: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    maxHeight: 150,
    maxWidth: 150,
  },
  title: {
    margin: 25,
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
});

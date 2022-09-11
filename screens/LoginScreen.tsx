import * as React from "react";
import LoginScreen, { SocialButton } from "react-native-login-screen";
import { useNavigation } from "@react-navigation/native";
import { Text, Image, StyleSheet, ScrollView } from "react-native";

export default function Login() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Home");
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <LoginScreen
        // style={styles.login}
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
          text="Continue with Google"
          imageSource={require("../assets/images/google.png")}
          onPress={() => {}}
          style={styles.button}
        />
      </LoginScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 10,
    flex: 1,
    maxHeight: 100,
    maxWidth: 100,
  },
  button: {},
});

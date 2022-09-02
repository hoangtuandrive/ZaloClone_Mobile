import * as React from "react";
import LoginScreen from "react-native-login-screen";

import { Text, Image, StyleSheet, View } from "react-native";

export default function Login() {
  return (
    <View style={{ flex: 1 }}>
      <LoginScreen
        logoImageSource={() => {}}
        onLoginPress={() => {}}
        onSignupPress={() => {}}
        onEmailChange={(email: string) => {}}
        onPasswordChange={(password: string) => {}}
      />
    </View>
  );
}

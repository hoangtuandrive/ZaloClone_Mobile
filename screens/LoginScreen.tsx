import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import Swiper from "react-native-swiper";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Auth } from "aws-amplify";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";

export default function Login() {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
      navigation.navigate("Home");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Swiper>
      <View style={styles.slide1}>
        <Image
          style={styles.image}
          source={require("../assets/images/fb-messenger.png")}
        ></Image>
        <Text style={styles.title}>Messenger</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={require("../assets/images/fb-messenger.png")}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />

          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{ required: "Username is required" }}
          />

          <CustomInput
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 3,
                message: "Password should be minimum 3 characters long",
              },
            }}
          />

          <CustomButton
            text={loading ? "Loading..." : "Sign In"}
            onPress={handleSubmit(onSignInPressed)}
          />

          <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />

          <SocialSignInButtons />

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    marginBottom: 20,
    margin: 10,
    maxHeight: 100,
    maxWidth: 100,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
  },
  logo: {
    marginTop: 20,
    marginBottom: 30,
    maxHeight: 80,
    maxWidth: 80,
  },
});

//   const navigation = useNavigation();
//   const [username, setUsername] = useState("hoangtuandrive@gmail.com");
//   const [password, setPassword] = useState("kltt3172");

//   async function onLoginPress(username: string, password: string) {
//     try {
//       const user = await Auth.signIn(username, password);
//       navigation.navigate("Home");
//     } catch (err) {
//       console.log("error signing in", err);
//     }
//   }

//   return (
//     <Swiper>
//       <View style={styles.slide1}>
//         <Image
//           style={styles.logo}
//           source={require("../assets/images/fb-messenger.png")}
//         ></Image>
//         <Text style={styles.title}>Messenger</Text>
//       </View>
//       <View style={styles.page}>
//         <LoginScreen
//           style={styles.login}
//           emailPlaceholder="Email"
//           passwordPlaceholder="Password"
//           logoImageSource={require("../assets/images/fb-messenger.png")}
//           onLoginPress={() => onLoginPress(username, password)}
//           onSignupPress={() => {}}
//           logoImageStyle={styles.image}
//           onEmailChange={(username: string) => {
//             console.log(username);
//             // setUsername(username);
//           }}
//           onPasswordChange={(password: string) => {
//             // setPassword(password);
//           }}
//         >
//           <SocialButton
//             text="Continue with Facebook"
//             imageSource={require("../assets/images/facebook.png")}
//             onPress={() => {}}
//             style={styles.button}
//             textContainerStyle={styles.text}
//           />
//           <SocialButton
//             text="Continue with Google"
//             imageSource={require("../assets/images/google.png")}
//             onPress={() => {}}
//             style={styles.button}
//             textContainerStyle={styles.text}
//           />
//         </LoginScreen>
//       </View>
//     </Swiper>
//   );
// }

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   login: {
//     backgroundColor: "white",
//     justifyContent: "center",
//   },
//   image: {
//     marginTop: 20,
//     margin: 10,
//     flex: 1,
//     maxHeight: 80,
//     maxWidth: 80,
//   },
//   button: {
//     margin: 10,
//     alignItems: "center",
//   },
//   first: {
//     color: "#fff",
//     fontSize: 30,
//     fontWeight: "bold",
//   },
//   slide1: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "white",
//   },
//   text: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     maxHeight: 150,
//     maxWidth: 150,
//   },
//   title: {
//     margin: 25,
//     color: "black",
//     fontSize: 32,
//     fontWeight: "bold",
//   },
// });

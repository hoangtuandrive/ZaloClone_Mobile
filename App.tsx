import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Amplify } from "aws-amplify";
// @ts-ignore
import awsconfig from "./src/aws-exports";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
// @ts-ignore
import { Authenticator, SignIn } from "aws-amplify-react-native";
import { Component } from "react";
import LoginScreen from "react-native-login-screen";
import React from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
Amplify.configure(awsconfig);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ActionSheetProvider>
          <Navigation colorScheme={"light"} />
        </ActionSheetProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default App;

// class AppWithAuth extends Component {
//   render() {
//     return (
//       <Authenticator hideDefault={true} theme={LoginScreen}>
//         <SignIn />
//       </Authenticator>
//     );
//   }
// }

// export default AppWithAuth;

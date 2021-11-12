import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import Storyboard from "./src/Storyboard";
import { StoreProvider } from "./src/RootStore";
import firebaseConfig from './firebaseConfig.json';

const app = initializeApp(firebaseConfig);
initializeFirestore(app, { experimentalForceLongPolling: true });
LogBox.ignoreLogs(['AsyncStorage has been extracted']);

import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";

export default function App() {
  return (
    <StoreProvider>
      <View style={styles.container}>
        <Storyboard />
        <StatusBar style="auto" />
      </View>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

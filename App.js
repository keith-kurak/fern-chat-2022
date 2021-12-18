import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Storyboard from "./src/Storyboard";
import { StoreProvider } from "./src/RootStore";
import firebaseConfig from './firebaseConfig.json';

const app = initializeApp(firebaseConfig);
// needed this due to connection failures on Android
initializeFirestore(app, { experimentalForceLongPolling: true });

LogBox.ignoreLogs(['AsyncStorage has been extracted']);

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

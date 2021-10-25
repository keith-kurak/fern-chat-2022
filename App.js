import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import Storyboard from "./src/Storyboard";
import { StoreProvider } from "./src/RootStore";
import firebaseConfig from './firebaseConfig.json';

const app = initializeApp(firebaseConfig);
initializeFirestore(app, { experimentalForceLongPolling: true });

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

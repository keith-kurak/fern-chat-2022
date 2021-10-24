import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { initializeApp } from "firebase/app";
import Storyboard from "./src/Storyboard";
import { StoreProvider } from "./src/RootStore";
import firebaseConfig from './firebaseConfig.json';

initializeApp(firebaseConfig);

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

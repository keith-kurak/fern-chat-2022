import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Storyboard from "./src/Storyboard";
import { StoreProvider } from "./src/RootStore"; // wrap everything with this and then it can access the rootStore

export default function App() {
  return (
    <View style={styles.container}>
      <Storyboard />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

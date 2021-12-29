import * as React from "react";
import { View, Text, Button } from "react-native"; // make a button and map it to rootStore.logout()
import { useStore } from "./RootStore";

export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>It's some settings!</Text>
    </View>
  );
}

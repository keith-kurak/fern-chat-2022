import * as React from "react";
import { View, Text, Button } from "react-native"; // make a button and wire it to rootStore.login()
import { useStore } from './RootStore';

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>You would login here!</Text>
    </View>
  );
}

import * as React from "react";
import { View, Text } from "react-native";

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
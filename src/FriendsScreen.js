import * as React from "react";
import { View, Text } from "react-native";

export default function FriendsScreen() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>It's a list of friends!!</Text>
    </View>
  );
}

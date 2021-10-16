import * as React from "react";
import { View, Text } from "react-native";

export default function ChatScreen({ route }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>It's a chat screen!!</Text>
      <Text>{`Channel with id ${route.params.channelId}`}</Text>
    </View>
  );
}

import * as React from "react";
import {
  View,
  Text,
  FlatList, // gonna need these to make a list of channels
  Pressable,
} from "react-native";

const mockChannels = []; // add some mocks and then display them!

export default function ChannelsScreen() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>It's a list of channels!!</Text>
    </View>
  );
}

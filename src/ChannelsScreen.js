import * as React from "react";
import { View, Text, FlatList, Pressable } from "react-native";

// mock data - we'll replace this later
const mockChannels = [
  {
    id: 1,
    name: "#videogames",
  },
  {
    id: 2,
    name: "#viralvideos",
  },
  {
    id: 3,
    name: "#underwaterbasketweaving",
  },
  {
    id: 4,
    name: "#codemash",
  },
  {
    id: 5,
    name: "#mashedpotatoes",
  },
  {
    id: 6,
    name: "#knittingcentral",
  },
  {
    id: 7,
    name: "#llamatalk",
  },
];

export default function ChannelsScreen({ navigation }) {
  return (
    <FlatList
      containerStyle={{
        flex: 1,
      }}
      data={mockChannels}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          style={
            ({ pressed }) => [
              { opacity: pressed ? 0.5 : 1.0 },
            ] /* touchable with opaciity */
          }
          onPress={() => {
            // navigate to a chat with a specific friend
            navigation.navigate("Chat", { channelId: item.id });
          }}
        >
          <View
            style={{
              paddingHorizontal: 7,
              paddingVertical: 14,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </View>
        </Pressable>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{ width: "100%", height: 1, backgroundColor: "lightGray" }}
        />
      )}
    />
  );
}

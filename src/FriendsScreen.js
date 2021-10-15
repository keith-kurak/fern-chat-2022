import * as React from "react";
import { View, Text, FlatList, TouchableOpacity, Pressable } from "react-native";

// mock data - we'll replace this later
const mockFriends = [
  {
    id: 1,
    name: "Steve",
  },
  {
    id: 2,
    name: "Melanie",
  },
  {
    id: 3,
    name: "Kavita",
  },
  {
    id: 4,
    name: "Jose",
  },
  {
    id: 5,
    name: "LeBron",
  },
  {
    id: 6,
    name: "Sarah",
  },
  {
    id: 7,
    name: "Erin",
  },
];

export default function UserListScreen({ navigation }) {
  return (
    <FlatList
      containerStyle={{
        flex: 1,
      }}
      data={mockFriends}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => { navigation.navigate('Chat', { friendId: item.id })}}>
        <View
          style={{
            paddingHorizontal: 7,
            paddingVertical: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </View>
        </Pressable>
      )}
      ItemSeparatorComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: 'lightGray'}} />}
    />
  );
}

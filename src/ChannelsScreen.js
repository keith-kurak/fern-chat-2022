import * as React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { observer } from "mobx-react";
import { useStore } from './RootStore';

export default observer(function ChannelsScreen({ navigation }) {
  const rootStore = useStore();
  return (
    <FlatList
      containerStyle={{
        flex: 1,
      }}
      data={rootStore.channelsSorted}
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
            <Text style={{ fontSize: 18 }}>{`#${item.name}`}</Text>
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
});

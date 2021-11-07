import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { observer } from "mobx-react";
import { sortBy } from "lodash";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { DateTime } from "luxon";

function colorForUsername(username) {
  const colors = ["purple", "green", "red", "blue", "brown", "orange"];
  return colors[username.charCodeAt(0) % 6];
}

const SimpleChat = observer(function ({ messages, onSendMessage, isSending }) {
  const [currentMessageText, setCurrentMessageText] = useState("");

  const onPressSend = useCallback(() => {
    onSendMessage(currentMessageText);
    setCurrentMessageText('');
  }, [ currentMessageText, setCurrentMessageText, onSendMessage ])

  const renderItem = useCallback(({ item }) => {
    const userColor = colorForUsername(item.username);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <EvilIcons name="user" size={40} color={userColor} />
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: userColor }}
            >
              {item.username}
            </Text>
            <Text style={{ fontStyle: "italic", fontSize: 12 }}>
              {DateTime.fromISO(item.timestamp).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </Text>
          </View>
          <Text style={{ fontSize: 14 }}>{item.text}</Text>
        </View>
      </View>
    );
  });

  const messagesSorted = sortBy(messages, (m) => m.timestamp).reverse();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={messagesSorted}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
      />
      <View
        style={{
          borderColor: "lightgray",
          borderWidth: 1,
          borderRadius: 3,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            fontSize: 14,
            flex: 1,
          }}
          placeholder="Write something..."
          onChangeText={(text) => setCurrentMessageText(text)}
          value={currentMessageText}
        />
        {currentMessageText && currentMessageText.length > 0 ? (
          <Pressable
            style={
              ({ pressed }) => [
                { opacity: pressed ? 0.5 : 1.0, paddingHorizontal: 10 },
              ] /* touchable with opaciity */
            }
            onPress={onPressSend}
          >
            <Ionicons name="send" color="blue" size={34} />
          </Pressable>
        ) : null}
      </View>
    </SafeAreaView>
  );
});

export default SimpleChat;

import React, { useState, useCallback } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { observer } from "mobx-react";

const Chat = observer(function ({ messages, onSendMessage, isSending }) {
  const [currentMessageText, setCurrentMessageText] = useState("");

  const renderItem = useCallback(({ item}) => {
    return <View>
      <Text>{item.time}</Text>
      <Text>{item.username}</Text>
      <Text>{item.text}</Text>
    </View>
  })
  
  return (
    <View style={{ flex: 1 }}>
      <FlatList style={{ flex: 1 }} data={messages} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
      <TextInput
        style={{ flex: 1 }}
        placeholder="Write something..."
        onChangeText={(text) => setCurrentMessageText(text)}
        value={text}
      />
    </View>
  );
});

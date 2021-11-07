import React, { useState } from "react";
import { View, Text } from "react-native";
import SimpleChat from './components/SimpleChat';
import { observer } from "mobx-react";
import { useStore } from './RootStore';

export default observer(function ChatScreen({ route }) {
  const rootStore = useStore();

  return (
    <SimpleChat messages={rootStore.messages} onSendMessage={rootStore.sendMessage} />
  );
});

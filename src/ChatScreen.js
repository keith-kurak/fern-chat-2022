import React, { useEffect } from "react";
import SimpleChat from "./components/SimpleChat";
import { observer } from "mobx-react";
import { useStore } from "./RootStore";

export default observer(function ChatScreen({ route }) {
  const rootStore = useStore();

  useEffect(() => {
    rootStore.startStreamingChannelMessages(route.params.channelId);

    return rootStore.stopStreamingCurrentChannel;
  }, []);

  return (
    <SimpleChat
      messages={rootStore.messages}
      onSendMessage={(text) =>
        rootStore.sendMessage({ text, channelId: route.params.channelId })
      }
    />
  );
});

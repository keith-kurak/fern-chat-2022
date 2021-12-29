import React, { useEffect } from "react";
import SimpleChat from './components/SimpleChat';
import { observer } from "mobx-react";
import { useStore } from './RootStore';

export default observer(function ChatScreen({ route }) {
  useEffect(() => {
    // subscribe to channel here!
  }, []);
  const rootStore = useStore();
  return (
    <SimpleChat messages={[
      {
        id: 1,
        time: Date.parse('01 Jan 2022 06:30:00 GMT'),
        username: 'michael',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
      },
      {
        id: 2,
        time: Date.parse('01 Jan 2022 07:31:00 GMT'),
        username: 'jane',
        text: 'e vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur'
      },
      {
        id: 3,
        time: Date.parse('01 Jan 2022 07:39:00 GMT'),
        username: 'michael',
        text: 'I agree!'
      },
      {
        id: 4,
        time: Date.parse('01 Jan 2022 08:16:00 GMT'),
        username: 'jane',
        text: 'Sounds good!'
      }
    ]} />
  );
});

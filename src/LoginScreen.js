import React, { useState } from "react";
import { View, Button, TextInput /* use these to accept username/ password */ } from "react-native";
import { useStore } from './RootStore';

// use these on each text input to make it not look so bad
const textInputStyle = {
  width: 250,
  fontSize: 16,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: "whitesmoke",
  padding: 5,
  margin: 3,
};

export default function LoginScreen() {
  const rootStore = useStore();

  // let's just use local state for username/ password - only need for as long as this screen is open
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onPress={() => rootStore.login({ username, password })} title="Login" />
    </View>
  );
}

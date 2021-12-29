import React, { useState } from "react";
import { View, Button } from "react-native";
import { useStore } from './RootStore';

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

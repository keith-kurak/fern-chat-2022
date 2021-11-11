import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { useStore } from "./RootStore";

export default function SettingsScreen() {
  const rootStore = useStore();
  const [username, setUsername] = useState(rootStore.username);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 100 }}>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={{
            fontSize: 18,
            width: 200,
            borderWidth: 1,
            borderColor: "lightgray",
            borderRadius: 3,
            marginRight: 10,
          }}
        />
        <Button onPress={() => rootStore.updateUsername(username)} title="Update Username" />
      </View>
      <Button onPress={() => rootStore.logout()} title="Logout" />
    </View>
  );
}

import * as React from "react";
import { View, Button } from "react-native";
import { useStore } from "./RootStore";

export default function SettingsScreen() {
  const rootStore = useStore();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onPress={() => rootStore.logout()} title="Logout" />
    </View>
  );
}

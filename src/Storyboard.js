import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import ChannelsScreen from "./ChannelsScreen";

const Stack = createNativeStackNavigator();

export default function Storyboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Channels"
          component={ChannelsScreen}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

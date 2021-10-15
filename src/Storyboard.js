import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import FriendsScreen from "./FriendsScreen";
import ChatScreen from "./ChatScreen";

const Stack = createNativeStackNavigator();

export default function Storyboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

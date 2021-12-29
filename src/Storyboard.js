import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons"; // need these to make a header button!
import { Pressable } from "react-native";
import SettingsScreen from "./SettingsScreen";
import ChannelsScreen from "./ChannelsScreen";
import ChatScreen from "./ChatScreen"; // add a route for me, call it "Chat"
import LoginScreen from "./LoginScreen"; // add a protected route for me, should only work when "logged out"

const Stack = createNativeStackNavigator();

export default function Storyboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Channels"
          component={ChannelsScreen}
          options={({ navigaton }) => ({
            // add header button here!
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

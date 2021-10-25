import React from "react";
import { Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { observer } from "mobx-react";
import SettingsScreen from "./SettingsScreen";
import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";
import ChannelsScreen from "./ChannelsScreen";
import { useStore } from './RootStore';

const Stack = createNativeStackNavigator();

export default observer(function Storyboard() {
  const rootStore = useStore();

  if (!rootStore.isLoggedIn) {
    return <LoginScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="Channels"
          component={ChannelsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Pressable
                style={
                  ({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1.0 },
                  ] /* touchable with opaciity */
                }
                onPress={() => rootStore.addChannel()}
              >
                <Feather name="plus" size={18} />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                style={
                  ({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1.0 },
                  ] /* touchable with opaciity */
                }
                onPress={() => navigation.navigate("Settings")}
              >
                <Feather name="settings" size={18} />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

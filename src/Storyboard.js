import * as React from "react";
import { Pressable, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import SettingsScreen from "./SettingsScreen";
import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";
import ChannelsScreen from "./ChannelsScreen";

const Stack = createNativeStackNavigator();

export default function Storyboard() {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <LoginScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="Channels"
          component={ChannelsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                style={
                  ({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1.0 },
                  ] /* touchable with opaciity */
                }
                onPress={() => navigation.navigate("Settings")}
              >
                <Feather name="settings" size={18} style={Platform.OS === 'web' && { paddingHorizontal: 10 }} />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

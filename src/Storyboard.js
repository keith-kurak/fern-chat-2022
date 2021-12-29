import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { Pressable, Platform } from "react-native";
import { observer } from "mobx-react"; // used because we're going to make this component react to rootStore.isLoggedIn
import SettingsScreen from "./SettingsScreen";
import ChannelsScreen from "./ChannelsScreen";
import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";
import { useStore } from "./RootStore"; // use me to gain access to rootStore.addChannel() and rootStore.isLoggedIn

const Stack = createNativeStackNavigator();

export default observer(function Storyboard() {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return <LoginScreen />;
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
                <Feather
                  name="settings"
                  size={18}
                  style={Platform.OS === "web" && { paddingHorizontal: 10 }}
                />
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

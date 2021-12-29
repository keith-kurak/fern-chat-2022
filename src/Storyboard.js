import * as React from "react";
import { Pressable, Platform, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { Pressable, Platform, KeyboardAvoidingView } from "react-native";
import { observer } from "mobx-react";
import SettingsScreen from "./SettingsScreen";
import ChannelsScreen from "./ChannelsScreen";
import ChatScreen from "./ChatScreen";
import LoginScreen from "./LoginScreen";
import { useStore } from "./RootStore";

const Stack = createNativeStackNavigator();

export default observer(function Storyboard() {
  const rootStore = useStore();

  if (!rootStore.isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === "ios"}
      style={{ flex: 1, backgroundColor: "#F2F2F2" }}
    >
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
                  <Feather
                    name="plus"
                    size={18}
                    style={Platform.OS === "web" && { paddingHorizontal: 10 }}
                  />
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
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={({ route }) => {
              const channel = rootStore.channelsSorted.find(
                (c) => c.id === route.params.channelId
              );
              return { title: channel ? channel.name : "Chat" };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
});

import React, { useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import { observer } from "mobx-react";
import { useStore } from "./RootStore";
import LoadingWrapper from "./components/LoadingWrapper";

const textInputStyle = {
  width: 250,
  fontSize: 16,
  borderWidth: 1,
  borderRadius: 5,
  borderColor: "whitesmoke",
  padding: 5,
  margin: 3,
};

export default observer(function LoginScreen() {
  const rootStore = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LoadingWrapper isLoading={rootStore.isLoading}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Email"
          style={textInputStyle}
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          secureTextEntry
          style={textInputStyle}
        />
        {rootStore.loginError && (
          <Text style={{ color: "red", marginVertical: 10 }}>
            Login failed! Check that your email and password are correct.
          </Text>
        )}
        <Button
          onPress={() => rootStore.login({ username, password })}
          title="Login"
        />
      </View>
    </LoadingWrapper>
  );
});

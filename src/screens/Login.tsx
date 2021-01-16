import * as React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { getData } from "../slices/dataSlices";
import { loginUser } from "../slices/userSlices";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="username"
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder="password"
        textContentType="password"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginTop: 10,
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Pressable
        onPress={login}
        style={{
          height: 40,
          borderColor: "blue",
          borderWidth: 1,
          marginTop: 12,
          borderRadius: 8,
          justifyContent: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Text>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

import * as React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { userSelector } from "../selectors";
import { getData } from "../slices/dataSlices";
import { loginUser } from "../slices/userSlices";
import globalStyle from "../styles/globalStyles";

export default function Login() {
  const dispatch = useDispatch();
  const state = useSelector(userSelector);
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
      <Text style={{ fontSize: 18 }}>Welcome to Tusk!</Text>
      <View style={globalStyle.input}>
        <TextInput
          placeholder="username"
          style={globalStyle.inputText}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>
      <View style={globalStyle.input}>
        <TextInput
          secureTextEntry={true}
          placeholder="password"
          textContentType="password"
          style={globalStyle.inputText}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      {state.errorLog ? (
        <Text style={{ color: "red" }}>{state.errorLog}</Text>
      ) : null}
      <View style={globalStyle.input}>
        <Pressable
          onPress={login}
          style={[
            {
              height: 40,
              marginTop: 12,
              borderRadius: 8,
              justifyContent: "center",
              paddingLeft: 10,
              paddingRight: 10,
            },
            globalStyle.inputButton,
          ]}
        >
          <Text style={{ color: "#FFF" }}>Login</Text>
        </Pressable>
      </View>
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

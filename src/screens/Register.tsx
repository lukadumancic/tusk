import * as React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { registerUser } from "../slices/userSlices";

export default function Register() {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const register = () => {
    dispatch(registerUser({ username, password, email, firstName, lastName }));
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
      <TextInput
        placeholder="email"
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="first name"
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        placeholder="last name"
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <Pressable
        onPress={register}
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
        <Text>Register</Text>
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

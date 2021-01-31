import * as React from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { userSelector } from "../selectors";
import { registerUser } from "../slices/userSlices";

import globalStyle from "../styles/globalStyles";

export default function Register() {
  const dispatch = useDispatch();
  const state = useSelector(userSelector);
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
      <View style={globalStyle.input}>
        <TextInput
          placeholder="email"
          style={globalStyle.inputText}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={globalStyle.input}>
        <TextInput
          placeholder="first name"
          style={globalStyle.inputText}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
      </View>
      <View style={globalStyle.input}>
        <TextInput
          placeholder="last name"
          style={globalStyle.inputText}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
      </View>
      {state.errorReg ? (
        <Text style={{ color: "red" }}>{state.errorReg}</Text>
      ) : null}
      <View style={globalStyle.input}>
        <Pressable
          onPress={register}
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
          <Text style={{ color: "#FFF" }}>Register</Text>
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

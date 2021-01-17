import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Companies from "../screens/Companies";
import Login from "../screens/Login";
import Projects from "../screens/Projects";
import Register from "../screens/Register";
import Sprints from "../screens/Sprints";
import Teams from "../screens/Teams";
import { userSelector } from "../selectors";
import { logoutUser } from "../slices/userSlices";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const userState = useSelector(userSelector);
  const dispatch = useDispatch();

  if (userState.isLoggedIn) {
    return (
      <BottomTab.Navigator
        initialRouteName="Companies"
        tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
      >
        <BottomTab.Screen
          name="Companies"
          component={Companies}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="people" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Teams"
          component={Teams}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-person" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Projects"
          component={Projects}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Sprints"
          component={Sprints}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="md-newspaper" color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Logout"
          component={View}
          options={{
            tabBarIcon: ({ color }) => (
              <Pressable
                onPress={() => {
                  dispatch(logoutUser());
                }}
              >
                <TabBarIcon name="log-out" color={color} />
              </Pressable>
            ),
          }}
        />
      </BottomTab.Navigator>
    );
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="log-in" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Register"
        component={RegisterNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="create-sharp" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function LoginNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "Login" }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function RegisterNavigation() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: "Register" }}
      />
    </TabTwoStack.Navigator>
  );
}

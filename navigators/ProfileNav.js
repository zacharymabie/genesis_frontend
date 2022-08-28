import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProfileContainer from "../screens/profile/ProfileContainer";
import Login from "../screens/profile/Login";
import Register from "../screens/profile/Register";

const Stack = createNativeStackNavigator();

const ProfileNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#85182A",
        },
        headerTitleStyle: {
          fontWeight: "bold",
          letterSpacing: 0.25,
          color: "white",
          fontSize: 25,
        },
      }}
    >
      <Stack.Screen
        name="ProfileContainer"
        component={ProfileContainer}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Login",
          headerBackVisible: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNav;

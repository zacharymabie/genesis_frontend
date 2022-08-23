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
    <Stack.Navigator>
      <Stack.Screen name="ProfileContainer" component={ProfileContainer} options={{title:""}}/>
      <Stack.Screen name="Login" component={Login} options={{title:""}}/>
      <Stack.Screen name="Register" component={Register} options={{title:""}}/>
    </Stack.Navigator>
  );
};

export default ProfileNav;

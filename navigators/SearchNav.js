import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "../screens/profile/Search.js"
import OtherProfile from "../screens/profile/OtherProfile.js";

const Stack = createNativeStackNavigator();

const SearchNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={Search} options={{title:""}}/>
      <Stack.Screen name="OtherProfile" component={OtherProfile} options={{title:""}}/>
    </Stack.Navigator>
  );
};

export default SearchNav;

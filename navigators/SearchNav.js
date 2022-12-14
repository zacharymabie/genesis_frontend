import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Search from "../screens/profile/Search.js"
import OtherProfile from "../screens/profile/OtherProfile.js";
import FollowerContainer from "../screens/profile/FollowerContainer.js";
import LikeContainer from "../screens/feed/LikeContainer";
import CommentContainer from "../screens/feed/CommentContainer";


const Stack = createNativeStackNavigator();

const SearchNav = () => {
  return (
    <Stack.Navigator
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: "#85182A",
      //   },
      //   headerTitleStyle: {
      //     fontWeight: "bold",
      //     letterSpacing: 0.25,
      //     color: "white",
      //     fontSize: 25,
      //   },
      // }}
    >
      <Stack.Screen name="SearchScreen" component={Search} options={{title:""}}/>
      <Stack.Screen name="OtherProfile" component={OtherProfile} options={{title:""}}/>
      <Stack.Screen name="FollowerContainer" component={FollowerContainer} options={{title:""}}/>
      <Stack.Screen 
        name="LikeContainer" 
        component={LikeContainer} 
        options={{title:"Likes", headerTitleStyle: { 
          fontWeight: "bold",
          letterSpacing: 0.25,
          color: "white",
          fontSize: 25,}, 
        headerStyle: { 
          backgroundColor: '#85182A',
          }}}/>
      <Stack.Screen 
        name="CommentContainer" 
        component={CommentContainer} 
        options={{title:"Comments", headerTitleStyle: { 
          fontWeight: "bold",
          letterSpacing: 0.25,
          color: "white",
          fontSize: 25,}, 
        headerStyle: { 
          backgroundColor: '#85182A',
          }}}/>
    </Stack.Navigator>
  );
};

export default SearchNav;

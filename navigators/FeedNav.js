import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedContainer from "../screens/feed/FeedContainer";
import NewPost from "../screens/feed/NewPost";
import LikeContainer from "../screens/feed/LikeContainer";
import CommentContainer from "../screens/feed/CommentContainer";
import OtherProfile from "../screens/profile/OtherProfile";

const Stack = createNativeStackNavigator();

const FeedNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedContainer" component={FeedContainer} options={{title:""}}/>
      <Stack.Screen name="NewPost" component={NewPost} options={{title:"New Post"}}/>
      <Stack.Screen name="LikeContainer" component={LikeContainer} options={{title:"Likes"}}/>
      <Stack.Screen name="CommentContainer" component={CommentContainer} options={{title:"Comments"}}/>
      <Stack.Screen name="OtherProfile" component={OtherProfile} options={{title:""}}/>
    </Stack.Navigator>
  );
};

export default FeedNav;

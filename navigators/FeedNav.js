import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FeedContainer from "../screens/feed/FeedContainer";
import NewPost from "../screens/feed/NewPost";
import LikeContainer from "../screens/feed/LikeContainer";
import CommentContainer from "../screens/feed/CommentContainer";

const Stack = createNativeStackNavigator();

const FeedNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedContainer" component={FeedContainer} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="LikeContainer" component={LikeContainer} />
      <Stack.Screen name="CommentContainer" component={CommentContainer} />
    </Stack.Navigator>
  );
};

export default FeedNav;

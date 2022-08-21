import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardContainer from "../screens/dashboard/DashboardContainer";
import NewWorkout from "../screens/dashboard/NewWorkout";
import PickExercise from "../screens/dashboard/PickExercise";
import InWorkout from "../screens/dashboard/InWorkout";

const Stack = createNativeStackNavigator();

const DashboardNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DashboardContainer" component={DashboardContainer} />
      <Stack.Screen name="NewWorkout" component={NewWorkout} />
      <Stack.Screen name="PickExercise" component={PickExercise} />
      <Stack.Screen name="InWorkout" component={InWorkout} />
    </Stack.Navigator>
  );
};

export default DashboardNav;

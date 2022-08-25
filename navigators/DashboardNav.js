import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardContainer from "../screens/dashboard/DashboardContainer";
import NewWorkout from "../screens/dashboard/NewWorkout";
import PickExercise from "../screens/dashboard/PickExercise";
import InWorkout from "../screens/dashboard/InWorkout";

const Stack = createNativeStackNavigator();

const DashboardNav = () => {
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
      <Stack.Screen name="Dashboard" component={DashboardContainer} />
      <Stack.Screen name="NewWorkout" component={NewWorkout} />
      <Stack.Screen name="PickExercise" component={PickExercise} />
      <Stack.Screen name="InWorkout" component={InWorkout} />
    </Stack.Navigator>
  );
};

export default DashboardNav;

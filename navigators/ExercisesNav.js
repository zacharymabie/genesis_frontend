import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ViewExercises from "../screens/exercises/ViewExercises";
import CreateExercise from "../screens/exercises/CreateExercise";

const Stack = createNativeStackNavigator();

const ExercisesNav = () => {
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
      <Stack.Screen name="Exercises" component={ViewExercises} />
      <Stack.Screen name="Create Exercise" component={CreateExercise} />
    </Stack.Navigator>
  );
};

export default ExercisesNav;

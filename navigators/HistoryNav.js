import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HistoryContainer from "../screens/history/HistoryContainer";
import WorkoutContainer from "../screens/workouts/WorkoutContainer";

const Stack = createNativeStackNavigator();

const HistoryNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HistoryContainer"
        component={HistoryContainer}
        options={{ title: "test" }}
      />
      <Stack.Screen
        name="WorkoutContainer"
        component={WorkoutContainer}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default HistoryNav;

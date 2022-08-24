import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HistoryContainer from "../screens/history/HistoryContainer";
import WorkoutContainer from "../screens/workouts/WorkoutContainer";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const Stack = createNativeStackNavigator();

const HistoryNav = () => {
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
        name="HistoryContainer"
        component={HistoryContainer}
        options={{ title: "History" }}
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

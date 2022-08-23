import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/profile/Login";
import Register from "../screens/profile/Register";
import ProgramContainer from "../screens/programs/ProgramsContainer";
import FeedContainer from "../screens/feed/FeedContainer";
import WorkoutContainer from "../screens/workouts/WorkoutContainer";
import DashboardConatiner from "../screens/dashboard/DashboardContainer";
import NewWorkout from "../screens/dashboard/NewWorkout";
import PickExercise from "../screens/dashboard/PickExercise";
import HistoryContainer from "../screens/history/HistoryContainer";
import ProfileContainer from "../screens/profile/ProfileContainer";
import FeedNav from "./FeedNav";
import HistoryNav from "./HistoryNav";
import DashboardNav from "./DashboardNav";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#85182A",
          },
          headerShown: false,
          drawerType: "front",
          drawerLabelStyle: {
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            letterSpacing: 0.25,
          },
          drawerActiveTintColor:
            "#ff1a00" /* font color for active screen label */,
          activeBackgroundColor: "#68f" /* bg color for active screen */,
          inactiveTintColor:
            "grey" /* Font color for inactive screens' labels */,
        }}
      >
        <Drawer.Screen name="Feed" component={FeedNav} />
        <Drawer.Screen name="History" component={HistoryNav} />
        <Drawer.Screen name="Dashboard" component={DashboardNav} />
        <Drawer.Screen name="Profile" component={ProfileContainer} />
        <Drawer.Screen name="Log Out" component={PickExercise} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Main;

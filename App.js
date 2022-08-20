import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./screens/profile/Login";
import Register from "./screens/profile/Register";
import ProgramContainer from "./screens/programs/ProgramsContainer";
import FeedContainer from "./screens/feed/FeedContainer";
import WorkoutContainer from "./screens/workouts/WorkoutContainer";
import DashboardConatiner from "./screens/dashboard/DashboardContainer";
import NewWorkout from "./screens/dashboard/NewWorkout";
import PickExercise from "./screens/dashboard/PickExercise";
import HistoryContainer from "./screens/history/HistoryContainer";
import ProfileContainer from "./screens/profile/ProfileContainer";
import Main from "./navigators/Main";
const Drawer = createDrawerNavigator();

export default function App() {
  return <Main />;
}

import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Login from "./screens/profile/Login";
import Register from "./screens/profile/Register";
import ProgramContainer from "./screens/programs/ProgramsContainer";
import FeedContainer from "./screens/feed/FeedContainer";
import WorkoutContainer from "./screens/workouts/WorkoutContainer";
import DashboardConatiner from "./screens/dashboard/DashboardContainer";
import NewWorkout from "./screens/dashboard/NewWorkout";
import PickExercise from "./screens/dashboard/PickExercise";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <PickExercise />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

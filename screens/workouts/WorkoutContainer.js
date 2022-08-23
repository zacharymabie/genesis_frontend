import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import WorkoutView from "./WorkoutView";

const { height, width } = Dimensions.get("window");

const data = require("../../assets/data/workouts.json");
const WorkoutContainer = () => {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    setWorkouts(data);
    return () => {
      setWorkouts(null);
    };
  }, []);
  if (!workouts) {
    return;
  }
  return (
    <View style={styles.container}>
      <WorkoutView key={workouts.id} item={workouts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85182A",
    alignItems: "center",
    height: height,
  },
});

export default WorkoutContainer;

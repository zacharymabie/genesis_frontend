import React, { useEffect, useState } from "react";
import { View } from "react-native";

import WorkoutView from "./WorkoutView";

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
  return <WorkoutView key={workouts.id} item={workouts} />;
};

export default WorkoutContainer;

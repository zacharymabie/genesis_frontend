import React, { useEffect, useState } from "react";
import { View } from "react-native";

import WorkoutView from "./WorkoutView";

const data = require("../../assets/data/workouts.json");
const WorkoutContainer = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    setWorkouts(data);
    return () => {
      setWorkouts([]);
    };
  }, []);
  return <WorkoutView key={workouts.id} item={workouts} />;
};

export default WorkoutContainer;

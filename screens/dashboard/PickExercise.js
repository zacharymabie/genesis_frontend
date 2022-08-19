import React from "react";
import { View } from "react-native";

import ExerciseContainer from "../exercises/ExerciseContainer";

let data = require("../../assets/data/exercises.json");

const PickExercise = () => {
  return <ExerciseContainer pick={true} items={data} />;
};

export default PickExercise;

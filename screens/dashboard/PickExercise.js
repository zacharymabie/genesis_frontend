import React from "react";
import { View } from "react-native";

import ExerciseContainer from "../exercises/ExerciseContainer";

let data = require("../../assets/data/exercises.json");

const PickExercise = (props) => {
  const { data, setFunction } = props;
  return (
    <ExerciseContainer pick={true} items={data} setFunction={setFunction} />
  );
};

export default PickExercise;

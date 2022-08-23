import React from "react";
import { View } from "react-native";
import InWorkoutCard from "./InWorkoutCard";

const InWorkoutList = (props) => {
  const { item, setNo, addExercise } = props;
  return (
    <View>
      <InWorkoutCard addExercise={addExercise} setNo={setNo} {...item} />
    </View>
  );
};

export default InWorkoutList;

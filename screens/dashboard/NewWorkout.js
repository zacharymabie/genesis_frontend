import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Dimensions,
} from "react-native";
import ExerciseContainer from "../exercises/ExerciseContainer";
import ExerciseList from "../exercises/ExerciseList";
import NewWorkoutExerciseList from "./NewWorkoutExerciseList";

const { width, height } = Dimensions.get("window");

const NewWorkout = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>New Workout</Text>
      </View>
      <View>
        <View style={styles.workoutInfo}>
          <TextInput style={styles.textInput} placeholder="Name of Workout" />
          <TextInput
            style={[styles.textInput, styles.description]}
            placeholder="Description"
            multiline={true}
            numberOfLines={5}
          />
        </View>
        <View style={styles.exerciseList}>
          <ExerciseContainer pick={false} />
        </View>
        <Button title="Add Exercise" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    margin: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
  },
  textInput: {
    borderWidth: 2,
    margin: 5,
    height: 40,
  },
  description: {
    height: height / 5,
  },
  exerciseList: {
    height: height / 2,
  },
  workoutInfo: {
    height: height / 3,
  },
});

export default NewWorkout;

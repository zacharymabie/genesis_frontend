import { useNavigation } from "@react-navigation/native";
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
import { useState } from "react";
import PickExercise from "./PickExercise";

const { width, height } = Dimensions.get("window");

const NewWorkout = () => {
  const navigation = useNavigation();

  const [exercises, setExercises] = useState([]);

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
          <PickExercise />
        </View>
        <View>
          <Button
            title="Start"
            onPress={() => navigation.navigate("InWorkout")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    margin: 10,
    height: height / 1.35,
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
    height: height / 6,
  },
  exerciseList: {
    height: height / 2,
  },
  workoutInfo: {
    height: height / 4,
  },
});

export default NewWorkout;

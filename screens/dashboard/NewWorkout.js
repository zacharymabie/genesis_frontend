import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import PickExercise from "./PickExercise";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
const { width, height } = Dimensions.get("window");

const NewWorkout = () => {
  const navigation = useNavigation();

  const [allExercises, setAllExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${baseURL}exercises`)
      .then((res) => {
        setAllExercises(res.data);
      })
      .catch((error) => {
        console.log("API Error");
      });
  }, []);

  const setFunction = (data) => {
    let curr_data = [];
    curr_data = selectedExercises.concat(data);
    setSelectedExercises(curr_data);
    console.log(selectedExercises);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>New Workout</Text>
      </View>
      <View>
        <View style={styles.workoutInfo}>
          <TextInput
            style={styles.textInput}
            placeholder="Name of Workout"
            onChangeText={(value) => setWorkoutName(value)}
          />
          <TextInput
            style={[styles.textInput, styles.description]}
            placeholder="Description"
            multiline={true}
            numberOfLines={5}
            onChangeText={(value) => setWorkoutDescription(value)}
          />
        </View>
        <View style={styles.exerciseList}>
          <PickExercise data={allExercises} setFunction={setFunction} />
        </View>
        <View>
          <Button
            title="Start"
            onPress={() =>
              navigation.navigate({
                name: "InWorkout",
                params: {
                  exercises: selectedExercises,
                  name: workoutName,
                  description: workoutDescription,
                },
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height / 1.35,
    backgroundColor: "#85182A",
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  textInput: {
    margin: 5,
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
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

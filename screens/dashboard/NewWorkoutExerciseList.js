import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import ExerciseCard from "../exercises/ExerciseCard";

let exercises = require("../../assets/data/exercises.json");

const NewWorkoutExerciseList = () => {
  const [exercise, setExercise] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseRemarks, setExerciseRemarks] = useState("");
  const [exerciseRestTime, setExerciseRestTime] = useState("");
  useEffect(() => {}, []);

  const appendArray = () => {
    let newExercise = {
      name: exerciseName,
      remarks: exerciseRemarks,
      restTime: exerciseRestTime,
    };

    exercises.push(newExercise);
  };

  const filterItem = (name) => {
    exercisesFiltered = [];
    for (var i = 0; i < exercise.length; i++) {
      if (exercise[i].name != name) {
        exercisesFiltered.push(exercise[i]);
      }
    }
    exercises = exercisesFiltered;
  };
  return (
    <View style={styles.bigContainer}>
      <View style={styles.list}>
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <ExerciseCard {...item} />
              <Button title="delete" onPress={() => filterItem(item.name)} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <View>
          <View style={styles.container}>
            <FormContainer title={"New Exercise"}>
              <Input
                placeholder={"Name of Exercise"}
                name={"name"}
                id={"name"}
                onChangeText={(text) => setExerciseName(text)}
              />
              <Input
                placeholder={"Remarks"}
                name={"remarks"}
                id={"remarks"}
                onChangeText={(text) => setExerciseRemarks(text)}
              />
              <Input
                placeholder={"Rest Time"}
                name={"resttime"}
                id={"resttime"}
                onChangeText={(text) => setExerciseRestTime(text)}
              />
            </FormContainer>
          </View>
          <Button title="Edit Exercises" onPress={() => appendArray()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    width: 300,
    height: 200,
  },
  name: {
    fontSize: 30,
  },
  list: { flex: 1 },
  bigContainer: { flex: 1 },
});

export default NewWorkoutExerciseList;

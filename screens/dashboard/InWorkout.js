import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { add } from "react-native-reanimated";

import InWorkoutCard from "../exercises/InWorkoutCard";
import InWorkoutList from "../exercises/InWorkoutList";

const InWorkout = ({ route }) => {
  const [postRequest, setPostRequest] = useState([]);
  const workoutDetails = {
    name: route.params.name,
    author: "5555",
    description: route.params.description,
    exercises: [],
  };

  const addExercise = (item) => {
    updatedExercises = postRequest.exercises.concat([item]);
    updatedRequest = postRequest;
    updatedRequest.exercises = updatedExercises;
    console.log(updatedRequest);
    setPostRequest(updatedRequest);
  };

  useEffect(() => {
    setPostRequest(workoutDetails);
    return () => {
      setPostRequest([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={route.params.exercises}
          renderItem={({ item }) => (
            <InWorkoutList
              addExercise={addExercise}
              key={item.id}
              item={item}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>End</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85182A",
    alignItems: "center",
  },
  list: {
    height: "90%",
    width: "95%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    width: "80%",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    alignSelf: "center",
  },
});

export default InWorkout;

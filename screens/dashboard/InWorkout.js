import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { add } from "react-native-reanimated";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../context/store/AuthGlobal";

import InWorkoutCard from "../exercises/InWorkoutCard";
import InWorkoutList from "../exercises/InWorkoutList";
import { useNavigation } from "@react-navigation/native";

const InWorkout = ({ route }) => {
  const [postRequest, setPostRequest] = useState([]);

  const navigation = useNavigation();

  const context = useContext(AuthGlobal);

  const workoutDetails = {
    name: route.params.name,
    author: route.params.userId,
    description: route.params.description,
    exercises: [],
  };

  const addExercise = (item) => {
    let updatedExercises = postRequest.exercises.concat([item]);
    let updatedRequest = postRequest;
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

  const endWorkout = (workout) => {
    const { data } = axios
      .post(`${baseURL}workouts`, workout)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error.response.data));
    navigation.navigate("History");
  };

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
      <Pressable
        onPress={() => {
          endWorkout(postRequest);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>End</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85182A",
    alignItems: "center",
    flex: 1,
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

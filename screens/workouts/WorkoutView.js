import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Button,
  TouchableHighlight,
} from "react-native";

import WorkoutListContainer from "./WorkoutListContainer";
import ExerciseContainer from "../exercises/ExerciseContainer";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const WorkoutView = (props) => {
  const navigation = useNavigation();

  const { name, author, description, exercises, id } = props;

  const deleteWorkout = (id) => {
    console.log(id);
    axios
      .delete(`${baseURL}workouts/${id}`)
      .then((res) => {
        navigation.navigate("HistoryContainer");
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <View style={styles.container}>
      <View style={styles.workoutInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.author}>{author}</Text>
        {/* why dont authors work? */}
        <Text>{description}</Text>
      </View>
      <View style={styles.exercises}>
        <ExerciseContainer items={exercises} />
      </View>
      <TouchableHighlight
        style={styles.button}
        onPress={() => deleteWorkout(id)}
        underlayColor="lightgrey"
        activeOpacity={1}
      >
        <View>
          <Text style={styles.buttonText}>Delete</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    width: (width * 7) / 8,
    height: height - 150,
    borderRadius: 4,
    backgroundColor: "white",
    flexDirection: "column",
  },
  imageContainer: {
    flex: 1,
  },
  image: { flex: 1, width: "100%", height: "100%" },
  workoutInfo: { flex: 1, alignItems: "center" },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#85182A",
    padding: "2%",
  },
  exercises: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    justifyContent: "flex-end",
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

export default WorkoutView;

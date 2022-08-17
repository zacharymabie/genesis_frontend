import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

import WorkoutListContainer from "./WorkoutListContainer";
import ExerciseContainer from "../exercises/ExerciseContainer";

const { height, width } = Dimensions.get("window");

const WorkoutCard = (props) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <View style={styles.workoutInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.author}>{item.author.name}</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.exercises}>
        <ExerciseContainer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: (width * 7) / 8,
    height: height - 150,
    borderRadius: 15,
    borderWidth: 5,
    flexDirection: "column",
  },
  imageContainer: {
    flex: 1,
  },
  image: { flex: 1, width: "100%", height: "100%" },
  workoutInfo: { flex: 1 },
  name: {
    fontSize: 30,
    padding: "2%",
  },
  exercises: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WorkoutView;

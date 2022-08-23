import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Button,
} from "react-native";

import WorkoutListContainer from "./WorkoutListContainer";
import ExerciseContainer from "../exercises/ExerciseContainer";

const { height, width } = Dimensions.get("window");

const WorkoutView = (props) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <View style={styles.workoutInfo}>
        <Text style={styles.name}>{item[0].name}</Text>
        <Text style={styles.author}>{item[0].author.username}</Text>
        {/* why dont authors work? */}
        <Text>{item[0].description}</Text>
      </View>
      <View style={styles.exercises}>
        <ExerciseContainer items={item[0].exercises} />
      </View>
      <Button title="Add Exercise" />
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WorkoutView;

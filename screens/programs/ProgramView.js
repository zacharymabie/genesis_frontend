import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

import WorkoutListContainer from "../workouts/WorkoutListContainer";

const { height, width } = Dimensions.get("window");

const ProgramCard = (props) => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/test.png")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.programInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.author}>{item.age}</Text>
        <Text>{item.description}</Text>
      </View>
      <View style={styles.workouts}>
        <WorkoutListContainer />
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
  programInfo: { flex: 1 },
  name: {
    fontSize: 30,
    padding: "2%",
  },
  workouts: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProgramCard;

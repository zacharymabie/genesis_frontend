import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const ExerciseSelector = (props) => {
  const [buttonTitle, setButtonTitle] = useState("+");
  const { item, name, remarks, restTime, setFunction } = props;

  const buttonChange = (title) => {
    if (title === "+") {
      setButtonTitle("✓");
      setFunction(item);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.exerciseContainer}>
        <View style={styles.workoutDetails}>
          <Text style={[styles.name, styles.text]}>{name}</Text>
          <Text style={styles.text}>{remarks}</Text>
          <Text style={styles.text}>{restTime}</Text>
        </View>
        <View>
          <Pressable
            style={
              buttonTitle != "✓"
                ? styles.button
                : [styles.button, { backgroundColor: "white" }]
            }
            onPress={() => buttonChange(buttonTitle)}
          >
            <Text
              style={
                buttonTitle != "✓"
                  ? styles.buttonText
                  : [styles.buttonText, { color: "black" }]
              }
            >
              {buttonTitle}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  exerciseContainer: {
    margin: 10,
    width: width / 1.1,
    height: 100,
    backgroundColor: "white",
    borderRadius: 4,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "#A71E35",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  workoutDetails: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    letterSpacing: 0.25,
  },
  name: {
    color: "#85182A",
    fontSize: 25,
    letterSpacing: 0.25,
    fontWeight: "bold",
  },
});

export default ExerciseSelector;

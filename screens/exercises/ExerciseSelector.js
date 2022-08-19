import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const ExerciseSelector = (props) => {
  const [buttonTitle, setButtonTitle] = useState("Add");
  const { name, remarks, restTime } = props;

  const buttonChange = (title) => {
    if (title === "Add") {
      setButtonTitle("Delete");
    } else {
      setButtonTitle("Add");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.exerciseContainer}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text>{remarks}</Text>
        </View>
        <View>
          <Text>{restTime}</Text>
        </View>
      </View>
      <View>
        <Button title={buttonTitle} onPress={() => buttonChange(buttonTitle)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  exerciseContainer: {
    borderWidth: 4,
    width: 300,
    height: 100,
  },
  name: {
    fontSize: 30,
  },
});

export default ExerciseSelector;

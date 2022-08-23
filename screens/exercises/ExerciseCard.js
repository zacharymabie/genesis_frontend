import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ExerciseCard = (props) => {
  const { name, remarks, restTime } = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View>
        <Text style={styles.text}>{remarks}</Text>
      </View>
      <View>
        <Text style={styles.text}>{restTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 4,
    width: 300,
    height: 100,
    backgroundColor: "#85182A",
  },
  name: {
    fontSize: 25,
    letterSpacing: 0.25,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ExerciseCard;

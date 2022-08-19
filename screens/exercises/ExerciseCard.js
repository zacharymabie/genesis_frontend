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
        <Text>{remarks}</Text>
      </View>
      <View>
        <Text>{restTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    width: 300,
    height: 100,
  },
  name: {
    fontSize: 30,
  },
});

export default ExerciseCard;

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InWorkoutCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Bench Press</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  name: {
    fontSize: 30,
  },
});

export default InWorkoutCard;

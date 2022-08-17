import React from "react";
import { View, StyleSheet, Text } from "react-native";

const WorkoutCard = (props) => {
  const { name, description, author } = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View>
        <Text>{description}</Text>
      </View>
      <View>
        <Text>{author.username}</Text>
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

export default WorkoutCard;

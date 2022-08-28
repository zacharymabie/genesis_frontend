import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const WorkoutCard = (props) => {
  const { name, description, author, timestamp } = props;
  let date = new Date(timestamp);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View>
        <Text>{author.username}</Text>
      </View>
      <View>
        <Text style={styles.timestamp}>{date.toDateString()}</Text>
        {/* Todo */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    width: width / 1.1,
    height: height / 9,
    padding: 10,
    alignItems: "center",
    borderRadius: 4,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  description: {
    letterSpacing: 0.25,
    color: "black",
  },
  timestamp: {
    letterSpacing: 0.25,
    color: "black",
    fontWeight: "bold",
  },
});

export default WorkoutCard;

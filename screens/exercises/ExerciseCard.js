import axios from "axios";
import React from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import baseURL from "../../assets/common/baseUrl";
const ExerciseCard = (props) => {
  const { name, remarks, restTime, sets, id } = props;

  const deleteExercise = (id) => {
    axios
      .delete(`${baseURL}exercises/${id}`)
      .then((res) => {})
      .catch((error) => console.log(error));
  };
  return (
    <View style={sets ? styles.container : styles.container2}>
      <View>
        <View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View>
          <Text style={styles.text}>{remarks}</Text>
        </View>
        <View>
          <Text style={styles.text}>Rest: {restTime} seconds</Text>
        </View>
      </View>

      {sets ? (
        sets.map((set) => (
          <Text style={styles.text}>
            Weight: {set.weight} Reps: {set.reps}
          </Text>
        ))
      ) : (
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            deleteExercise(id);
          }}
          underlayColor="lightgrey"
          activeOpacity={1}
        >
          <View>
            <Text style={styles.buttonText}>x</Text>
          </View>
        </TouchableHighlight>
      )}
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
  container2: {
    alignItems: "center",
    borderRadius: 4,
    width: "100%",
    height: 100,
    backgroundColor: "#85182A",
    flexDirection: "row",
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 0,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#85182A",
    width: "15%",
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
  },
});

export default ExerciseCard;

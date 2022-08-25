import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from "react-native";
import ExerciseList from "./ExerciseList";

import baseURL from "../../assets/common/baseUrl";

const ViewExercises = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}exercises`)
      .then((res) => {
        setExercises(res.data);
      })
      .catch((error) => {
        console.log("API Error");
      });
    return () => {
      setExercises([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseList pick={false} item={item} />}
        />
      </View>
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => console.log("Headshot bang")}
          underlayColor="lightgrey"
          activeOpacity={1}
        >
          <View>
            <Text style={styles.buttonText}>Add Exercise</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85182A",
    flex: 1,
  },
  list: {
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    alignSelf: "center",
  },
});

export default ViewExercises;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import ExerciseList from "./ExerciseList";

import baseURL from "../../assets/common/baseUrl";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const ViewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseIds, setExerciseIds] = useState([]);

  const navigation = useNavigation();

  const appendId = (exercise) => {
    let curr_ids = exerciseIds;
    curr_ids.push(exercise.id);
    setExerciseIds(curr_ids);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}users/62f627a8fc65975e12b69c05`)
      .then((res) => {
        setExercises(res.data.exerciseList);
        res.data.exerciseList.map((exercise) => {
          appendId(exercise);
        });
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
          onPress={() => {
            console.log(exerciseIds);
            navigation.navigate({
              name: "Create Exercise",
              params: {
                exerciseIds: exerciseIds,
              },
            });
          }}
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
    height: height / 1.25,
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

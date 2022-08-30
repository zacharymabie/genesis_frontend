import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import ExerciseContainer from "../exercises/ExerciseContainer";
import ExerciseList from "../exercises/ExerciseList";
import NewWorkoutExerciseList from "./NewWorkoutExerciseList";
import PickExercise from "./PickExercise";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../context/store/AuthGlobal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get("window");

const NewWorkout = () => {
  const navigation = useNavigation();

  const [allExercises, setAllExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");

  const context = useContext(AuthGlobal);
  useEffect(() => {
    AsyncStorage.getItem("jwt").then((res) => {
      if (context.stateUser.user.userId) {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`)
          .then((res) => {
            setAllExercises(res.data.exerciseList);
          })
          .catch((error) => {
            console.log("API Error");
          });
      }
    });
  }, []);

  const setFunction = (data) => {
    let curr_data = [];
    curr_data = selectedExercises.concat(data);
    setSelectedExercises(curr_data);
    console.log(selectedExercises);
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <View>
          <View style={styles.workoutInfo}>
            <Text style={styles.inputLabel}> Name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name of Workout"
              onChangeText={(value) => setWorkoutName(value)}
            />
            <Text style={styles.inputLabel}> Description: </Text>
            <TextInput
              style={[styles.textInput, styles.description]}
              placeholder="Description"
              multiline={true}
              numberOfLines={5}
              onChangeText={(value) => setWorkoutDescription(value)}
            />
          </View>
          <View style={styles.exerciseList}>
            <PickExercise data={allExercises} setFunction={setFunction} />
          </View>
          <View>
            <TouchableHighlight
              style={styles.button}
              onPress={() =>
                navigation.navigate({
                  name: "InWorkout",
                  params: {
                    exercises: selectedExercises,
                    name: workoutName,
                    description: workoutDescription,
                    userId: context.stateUser.user.userId,
                  },
                })
              }
              underlayColor="lightgrey"
              activeOpacity={1}
            >
              <View>
                <Text style={styles.buttonText}>Start</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height / 1.35,
    backgroundColor: "#85182A",
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "flex-start",
  },
  textInput: {
    alignSelf: "center",
    margin: 5,
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
    width: width / 1.1,
  },
  description: {
    height: height / 9.2,
  },
  exerciseList: {
    height: height / 2,
  },
  workoutInfo: {
    height: height / 4,
    margin: 15,
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

export default NewWorkout;

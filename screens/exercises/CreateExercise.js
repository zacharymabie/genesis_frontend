import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState, useContext } from "react";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../context/store/AuthGlobal";

const { width, height } = Dimensions.get("window");

const CreateExercise = ({ route }) => {
  const navigaton = useNavigation();
  const [exerciseId, setExerciseId] = useState("");
  const [name, setName] = useState("");
  const [restTime, setRestTime] = useState("");
  const [remarks, setRemarks] = useState("");
  let curr_ids = route.params.exerciseIds;
  const context = useContext(AuthGlobal);

  const appendId = (id) => {
    console.log(curr_ids);
    curr_ids.push(id);
    return curr_ids;
  };

  //TODO change test id to user ID variable
  const addExercise = (exerciseIds) => {
    AsyncStorage.getItem("jwt").then((res) => {
      if (context.stateUser.user.userId) {
        const { data } = axios
          .put(`${baseURL}users/list/${context.stateUser.user.userId}`, {
            exercises: exerciseIds,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          })
          .catch((error) => console.log(error.response.data));
      }
    });
  };

  const createExercise = () => {
    AsyncStorage.getItem("jwt").then((res) => {
      if (context.stateUser.user.userId) {
        const { data } = axios
          .post(`${baseURL}exercises`, {
            name: name,
            restTime: parseInt(restTime),
            remarks: remarks,
            user: context.stateUser.user.userId,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
            if (res.status == 200) {
              addExercise(appendId(`${res.data.id}`));
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput
            style={[styles.textInput, styles.nameInput]}
            placeholder="eg. Barbell Bench Press"
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Rest Time (seconds):</Text>
          <TextInput
            style={[styles.textInput, styles.restTimeInput]}
            placeholder="eg. 100"
            onChangeText={(value) => setRestTime(value)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Remarks:</Text>
          <TextInput
            style={[styles.textInput, styles.remarksInput]}
            placeholder="Remarks for this exercise"
            onChangeText={(value) => setRemarks(value)}
          />
        </View>
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              createExercise();
              navigaton.navigate("Exercises");
            }}
            underlayColor="lightgrey"
            activeOpacity={1}
          >
            <View>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85182A",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "justify",
    alignItems: "center",
    justifyContent: "center",
  },
  inputLabel: {
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  textInput: {
    margin: 10,
    height: 40,
    backgroundColor: "white",
    borderRadius: 4,
  },
  nameInput: {
    width: width / 2,
  },
  restTimeInput: { width: width / 3.9 },
  remarksInput: { width: width / 2.2 },
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

export default CreateExercise;

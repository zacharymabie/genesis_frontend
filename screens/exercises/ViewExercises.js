import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../context/store/AuthGlobal";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const ViewExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseIds, setExerciseIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();

  const appendId = (exercise) => {
    let curr_ids = exerciseIds;
    curr_ids.push(exercise.id);
    setExerciseIds(curr_ids);
  };

  useEffect(() => {
    AsyncStorage.getItem("jwt").then((res) => {
      console.log(context.stateUser.user.userId);
      if (context.stateUser.user.userId) {
        axios
          .get(`${baseURL}users/${context.stateUser.user.userId}`)
          .then((res) => {
            setExercises(res.data.exerciseList);
            res.data.exerciseList.map((exercise) => {
              appendId(exercise);
            });
          })
          .catch((error) => {
            console.log("API Error");
          });
      }
    });
    return () => {
      setExercises([]);
    };
  }, [context.stateUser.isAuthenticated]);

  const getData = () => {
    setRefreshing(true);
    axios
      .get(`${baseURL}users/${context.stateUser.user.userId}`)
      .then((res) => {
        setExercises(res.data.exerciseList);
        res.data.exerciseList.map((exercise) => {
          appendId(exercise);
        });
      })
      .catch((error) => {
        console.log("API Error");
      })
      .finally(setRefreshing(false));
  };

  const showEmptyListView = () => {
    return (
      <View>
        <Text style={styles.text}>No Exercises Yet!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <FlatList
          data={exercises}
          renderItem={({ item }) => <ExerciseList pick={false} item={item} />}
          refreshing={refreshing}
          onRefresh={() => getData()}
          ListEmptyComponent={() => showEmptyListView()}
        />
      </View>
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
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
    width: "100%",
  },
  list: {
    height: height / 1.25,
    width: "100%",
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
    margin: 20,
  },
});

export default ViewExercises;

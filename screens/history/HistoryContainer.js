import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import WorkoutListContainer from "../workouts/WorkoutListContainer";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

const HistoryContainer = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}workouts`)
      .then((res) => {
        setWorkouts(res.data);
      })
      .catch((error) => {
        console.log("API Error");
      });
    return () => {
      setWorkouts([]);
    };
  }, []);

  return (
    <View>
      <View>
        <Text style={styles.title}>Past Workouts</Text>
      </View>
      <View style={styles.list}>
        <WorkoutListContainer data={workouts} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "500",
  },
  list: {
    alignItems: "center",
  },
});
export default HistoryContainer;

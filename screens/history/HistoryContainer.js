import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import WorkoutListContainer from "../workouts/WorkoutListContainer";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

const HistoryContainer = () => {
  const [workouts, setWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getData();
    return () => {
      setWorkouts([]);
    };
  }, []);

  const getData = () => {
    setRefreshing(true);
    axios
      .get(`${baseURL}workouts`)
      .then((res) => {
        setWorkouts(res.data);
      })
      .catch((error) => {
        console.log("API Error");
      })
      .finally(setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <WorkoutListContainer
          data={workouts}
          refreshing={refreshing}
          function={getData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85182A",
  },
  list: {
    alignItems: "center",
  },
});
export default HistoryContainer;

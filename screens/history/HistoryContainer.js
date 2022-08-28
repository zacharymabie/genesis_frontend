import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import WorkoutListContainer from "../workouts/WorkoutListContainer";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../context/store/AuthGlobal";

const HistoryContainer = () => {
  const [workouts, setWorkouts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const context = useContext(AuthGlobal);
  useEffect(() => {
    AsyncStorage.getItem("jwt").then((res) => {
      if (context.stateUser.user.userId) {
        axios
          .get(`${baseURL}workouts/user/${context.stateUser.user.userId}`)
          .then((res) => {
            setWorkouts(res.data);
          })
          .catch((error) => {
            console.log("API Error test");
          });
      }
    });

    return () => {
      setWorkouts([]);
    };
  }, [context.stateUser.isAuthenticated]);

  const getData = (user_id) => {
    setRefreshing(true);
    axios
      .get(`${baseURL}workouts/user/${context.stateUser.user.userId}`)
      .then((res) => {
        setWorkouts(res.data);
      })
      .catch((error) => {
        console.log("API Error test");
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
          user_id={context.stateUser.user.userId}
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

import React from "react";
import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import WorkoutList from "./WorkoutList";

const data = require("../../assets/data/workouts.json");

const WorkoutListContainer = (props) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setWorkouts(data);

    return () => {
      setPrograms([]);
    };
  }, []);

  return (
    <View>
      <Text> Workouts </Text>
      <View>
        <FlatList
          data={workouts}
          renderItem={({ item }) => <WorkoutList key={item.id} item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default WorkoutListContainer;

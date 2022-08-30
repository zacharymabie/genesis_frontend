import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import WorkoutList from "./WorkoutList";

const WorkoutListContainer = (props) => {
  let data = props.data;

  const showEmptyListView = () => {
    return (
      <View>
        <Text style={styles.text}>No Workouts Yet!</Text>
      </View>
    );
  };

  return (
    <View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <WorkoutList key={item.id} item={item} />}
          keyExtractor={(item) => item.id}
          refreshing={props.refreshing}
          onRefresh={() => props.function(props.user_id)}
          ListEmptyComponent={() => showEmptyListView()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default WorkoutListContainer;

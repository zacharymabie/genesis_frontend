import React from "react";
import { View, Text, FlatList } from "react-native";
import { useState, useEffect } from "react";
import WorkoutList from "./WorkoutList";

const WorkoutListContainer = (props) => {
  let data = props.data;

  return (
    <View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <WorkoutList key={item.id} item={item} />}
          keyExtractor={(item) => item.id}
          refreshing={props.refreshing}
          onRefresh={() => props.function()}
        />
      </View>
    </View>
  );
};

export default WorkoutListContainer;

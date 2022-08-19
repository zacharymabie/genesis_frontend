import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import WorkoutCard from "./WorkoutCard";

const WorkoutList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity>
      <View>
        <WorkoutCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutList;
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import WorkoutCard from "./WorkoutCard";

const WorkoutList = (props) => {
  const navigation = useNavigation();

  const { item } = props;
  return (
    <TouchableOpacity onPress={() => navigation.navigate("WorkoutContainer")}>
      <View>
        <WorkoutCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutList;

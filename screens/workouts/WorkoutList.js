import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, InteractionManager } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import WorkoutCard from "./WorkoutCard";

const WorkoutList = (props) => {
  const navigation = useNavigation();

  const { item } = props;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate({
          name: "WorkoutContainer",
          params: {
            name: item.name,
            author: item.author.username,
            description: item.description,
            exercises: item.exercises,
            id: item.id,
          },
        })
      }
    >
      <View>
        <WorkoutCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutList;

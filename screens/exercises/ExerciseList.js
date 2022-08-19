import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import ExerciseCard from "./ExerciseCard";
import ExerciseSelector from "./ExerciseSelector";

const ExerciseList = (props) => {
  const { item, pick } = props;
  if (pick) {
    return (
      <View>
        <View>
          <ExerciseSelector {...item} />
        </View>
      </View>
    );
  } else
    return (
      <TouchableOpacity>
        <View>
          <ExerciseCard {...item} />
        </View>
      </TouchableOpacity>
    );
};

export default ExerciseList;

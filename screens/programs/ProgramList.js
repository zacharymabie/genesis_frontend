import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import ProgramCard from "./ProgramCard";

const { width, hegiht } = Dimensions.get;

const ProgramList = (props) => {
  const { item } = props;
  console.log(item);
  return (
    <TouchableOpacity>
      <View>
        <ProgramCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

export default ProgramList;

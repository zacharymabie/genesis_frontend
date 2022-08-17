import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

import ProgramList from "./ProgramList";

const ProgramContainer = () => {
  return (
    <View style={styles.container}>
      <ProgramList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});

export default ProgramContainer;

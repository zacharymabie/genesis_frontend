import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import ProgramList from "../programs/ProgramList";
import ProgramContainer from "../programs/ProgramsContainer";

const DashboardConatiner = () => {
  return (
    <View style={styles.container}>
      <View>
        <Button title="Start New Program" />
        <Button title="Start New Workout" />
      </View>
      <View>
        <Text>Current Programs</Text>
        <ProgramContainer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 100 },
});

export default DashboardConatiner;

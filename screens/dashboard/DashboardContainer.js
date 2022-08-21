import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import ProgramList from "../programs/ProgramList";
import ProgramContainer from "../programs/ProgramsContainer";

const DashboardContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Start New Workout"
          onPress={() => navigation.navigate("NewWorkout")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 100 },
});

export default DashboardContainer;

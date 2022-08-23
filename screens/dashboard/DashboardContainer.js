import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import ProgramList from "../programs/ProgramList";
import ProgramContainer from "../programs/ProgramsContainer";

const { height, width } = Dimensions.get("window");

const DashboardContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("NewWorkout")}
        >
          <Text style={styles.buttonText}>Start New Workout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "#85182A", flex: 1 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#A71E35",
  },
  buttonText: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

export default DashboardContainer;

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableHighlight,
} from "react-native";
import ProgramList from "../programs/ProgramList";
import ProgramContainer from "../programs/ProgramsContainer";

const { height, width } = Dimensions.get("window");

const DashboardContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate("NewWorkout")}
          underlayColor="lightgrey"
          activeOpacity={1}
        >
          <View>
            <Text style={styles.buttonText}>Start New Workout</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#85182A",
    flex: 1,
  },
  buttonContainer: {},
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    justifyContent: "flex-end",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    alignSelf: "center",
  },
});

export default DashboardContainer;

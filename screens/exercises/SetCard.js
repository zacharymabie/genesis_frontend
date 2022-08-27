import { setStatusBarBackgroundColor } from "expo-status-bar";
import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";

const SetCard = (props) => {
  const { setNo, item, setSets, sets, appendFinal, finalSets } = props;
  const [currReps, setCurrReps] = useState("");
  const [currWeight, setCurrWeight] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);

  //   const updateSet = () => {
  //     if (currReps === "") {
  //       item.weight = 0;
  //       item.reps = 0;
  //       let cutArr = sets.slice(1);
  //       let new_sets = cutArr.push(item);
  //       setSets(new_sets);
  //     }
  //     if (currWeight === "") {
  //       item.weight = 0;
  //       item.reps = 0;
  //       let cutArr = sets.slice(0, -1);
  //       let new_sets = cutArr.push(item);
  //       setSets(new_sets);
  //       console.log(sets);
  //     } else {
  //       item.reps = parseInt(currReps);
  //       item.weight = parseInt(currWeight);
  //       let cutArr = sets.slice(0, -1);
  //       let new_sets = cutArr.push(item);
  //       setSets(new_sets);
  //       console.log(sets);
  //     }
  //   };

  const setDone = () => {
    const finishedSet = {
      reps: currReps,
      weight: currWeight,
    };
    appendFinal(finishedSet);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor: buttonClicked ? "lightgrey" : "white" },
        ]}
        keyboardType={"decimal-pad"}
        onChangeText={(value) => {
          setCurrWeight(value);
        }}
        editable={buttonClicked ? false : true}
      />
      <Text style={styles.labels}>kg</Text>
      <TextInput
        style={[
          styles.textInput,
          { backgroundColor: buttonClicked ? "lightgrey" : "white" },
        ]}
        keyboardType={"decimal-pad"}
        onChangeText={(value) => {
          setCurrReps(value);
        }}
        editable={buttonClicked ? false : true}
      />
      <Text style={styles.labels}>Reps</Text>
      <Pressable
        onPress={() => {
          setDone();
          setButtonClicked(true);
        }}
        style={[
          { backgroundColor: buttonClicked ? "#00A36C" : "#85182A" },
          styles.checkButton,
        ]}
        disabled={buttonClicked ? true : false}
      >
        <Text style={styles.checkButtonText}>✓</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  textInput: {
    height: 25,
    width: 50,
    margin: 3,
    borderRadius: 4,
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderWidth: 3,
    borderColor: "black",
  },
  labels: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  checkButton: {
    borderRadius: 4,
    height: 25,
    width: 25,
  },
  checkButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});

export default SetCard;

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import SetList from "./SetList";

const { height, width } = Dimensions.get("window");

const InWorkoutCard = (props) => {
  const [sets, setSets] = useState([]);
  const [setNo, setSetNo] = useState(0);
  const [finalSets, setFinalSets] = useState([]);
  const [doingExcercise, setDoingExcercise] = useState(true);
  const { name, addExercise, remarks, restTime } = props;

  const appendFinal = (item) => {
    let newSets = finalSets.concat([item]);
    console.log(newSets);
    setFinalSets(newSets);
  };

  const addSet = (sets) => {
    let newSetNo = setNo + 1;
    setSetNo(newSetNo);
    let curr_sets = sets;
    const newSet = {
      weight: 0,
      reps: 0,
    };
    let new_sets = curr_sets.concat(newSet);
    setSets(new_sets);
  };

  const removeSet = (sets) => {
    if (setNo > 0) {
      let newSetNo = setNo - 1;
      setSetNo(newSetNo);
    }
    sets.pop();
    setSets(sets);
  };

  const rightSwipeActions = () => {
    return (
      <View
        style={{
          width: "90%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            paddingHorizontal: 50,
            paddingVertical: 20,
            fontSize: 30,
          }}
        >
          {name}✓
        </Text>
      </View>
    );
  };

  const swipeFromRightOpen = () => {
    const exercise = {
      name: name,
      user: "62f627a8fc65975e12b69c05",
      restTime: restTime,
      remarks: remarks,
      sets: finalSets,
    };
    addExercise(exercise);
    setDoingExcercise(false);
  };

  const leftSwipeActions = () => {
    return (
      <View>
        <Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            fontWeight: "bold",
            paddingHorizontal: 30,
            paddingVertical: 20,
            fontSize: 30,
          }}
        >
          Delete
        </Text>
      </View>
    );
  };

  const swipeFromLeftOpen = () => {
    alert("Nah bro");
  };

  return (
    <Swipeable
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}
      renderLeftActions={leftSwipeActions}
      onSwipeableLeftOpen={swipeFromLeftOpen}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.labels}>
            <Text style={styles.name}>{name}</Text>

            {doingExcercise && (
              <View style={styles.buttons}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    addSet(sets);
                  }}
                >
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={() => removeSet(sets)}
                >
                  <Text style={styles.buttonText}>-</Text>
                </Pressable>
              </View>
            )}
          </View>
          {doingExcercise && (
            <View styles={styles.list}>
              <FlatList
                data={sets}
                renderItem={({ item }) => (
                  <SetList
                    sets={sets}
                    setSets={setSets}
                    item={item}
                    setNo={setNo}
                    appendFinal={appendFinal}
                    finalSets={finalSets}
                  />
                )}
              />
            </View>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 10,
  },
  labels: { width: "100%", alignItems: "center", flexDirection: "row" },
  weightInput: { alignItems: "center" },
  repInput: { alignItems: "center" },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    margin: 30,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
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
  },
  input: {
    borderWidth: 2,
    width: "40%",
  },
  list: {
    borderWidth: 3,
  },
});

export default InWorkoutCard;

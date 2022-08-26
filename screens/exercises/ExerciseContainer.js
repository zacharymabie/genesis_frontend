import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import ExerciseList from "./ExerciseList";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";

const { height, width } = Dimensions.get("window");

const ExerciseContainer = (props) => {
  const { items, pick, setFunction } = props;
  if (pick) {
    return (
      <View>
        <Text style={styles.title}>Exercises</Text>
        <View style={styles.list}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ExerciseList
                setFunction={setFunction}
                pick={pick}
                key={item.id}
                item={item}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.title2}>Exercises</Text>
        <View style={styles.list2}>
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ExerciseList pick={pick} key={item.id} item={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#85182A",
    textAlign: "center",
  },
  list: {
    alignItems: "center",
    height: height / 2.52,
  },
  list2: {},
});

export default ExerciseContainer;

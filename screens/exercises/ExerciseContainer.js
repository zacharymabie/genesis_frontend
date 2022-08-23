import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import ExerciseList from "./ExerciseList";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";

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
        <View>
          <FormContainer title={"New Exercise"}>
            <Input
              placeholder={"Name of Exercise"}
              name={"name"}
              id={"name"}
              onChangeText={(text) => setExerciseName(text)}
            />
            <Input
              placeholder={"Remarks"}
              name={"remarks"}
              id={"remarks"}
              onChangeText={(text) => setExerciseRemarks(text)}
            />
            <Input
              placeholder={"Rest Time"}
              name={"resttime"}
              id={"resttime"}
              onChangeText={(text) => setExerciseRestTime(text)}
            />
          </FormContainer>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text>Exercises</Text>
        <View>
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
  list: {
    alignItems: "center",
  },
});

export default ExerciseContainer;

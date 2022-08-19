import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Button,
} from "react-native";

import ProgramList from "./ProgramList";
import ProgramView from "./ProgramView.js";

const data = require("../../assets/data/programs.json");

const ProgramContainer = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    setPrograms(data);
    return () => {
      setPrograms([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Create New Program" />
      <View>
        <Text> Current Programs</Text>
        <FlatList
          horizontal={true}
          data={programs}
          renderItem={({ item }) => <ProgramList key={item.id} item={item} />}
          keyExtractor={(item) => item.id}
        />
        <Text> Explore New Programs </Text>
        <FlatList
          data={programs}
          renderItem={({ item }) => <ProgramList key={item.id} item={item} />}
          keyExtractor={(item) => item.id}
        />
        {/* <ProgramView key={programs.id} item={programs} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});

export default ProgramContainer;

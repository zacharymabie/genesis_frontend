import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ProgramCard from "./ProgramCard";

const ProgramList = () => {
  return (
    <ScrollView>
      <TouchableOpacity>
        <ProgramCard />
      </TouchableOpacity>
      <TouchableOpacity>
        <ProgramCard />
      </TouchableOpacity>
      <TouchableOpacity>
        <ProgramCard />
      </TouchableOpacity>
      <TouchableOpacity>
        <ProgramCard />
      </TouchableOpacity>
      <TouchableOpacity>
        <ProgramCard />
      </TouchableOpacity>
      <TouchableOpacity>
        <ProgramCard />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});

export default ProgramList;

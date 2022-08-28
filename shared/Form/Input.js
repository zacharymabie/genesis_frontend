import React from "react";
import { TextInput, StyleSheet, Text, View, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const Input = (props) => {
  return (
    <View>
      <Text style={styles.inputLabel}> {props.name}:</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        autoCapitalize="none"
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 6,
    width: width / 1.2,
    height: height / 16,
    fontSize: 22,
    margin: 10,
  },
  inputLabel: {
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontSize: 22,
  },
});

export default Input;

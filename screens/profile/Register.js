import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Error from "../../shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || password === "") {
      setError("Please fill in empty fields");
    }

    let user = {
      email: email,
      username: username,
      name: name,
      password: password,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          console.log("success");
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      viewIsInsideTabBar={true}
      extraHeight={200}
    >
      <FormContainer>
        <Input
          placeholder={"Email"}
          name={"Email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Username"}
          name={"Username"}
          id={"username"}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder={"Name"}
          name={"Name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Password"}
          name={"Password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View>{error ? <Error message={error} /> : null}</View>
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => register()}
            underlayColor="lightgrey"
            activeOpacity={1}
          >
            <View>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => props.navigation.navigate("Login")}
            underlayColor="lightgrey"
            activeOpacity={1}
          >
            <View>
              <Text style={styles.buttonText}>Back to Login</Text>
            </View>
          </TouchableHighlight>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85182A",
  },
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
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
export default Register;

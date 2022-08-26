import React, { useEffect, useState, useContext } from "react";
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

//Context
import AuthGlobal from "../../context/store/AuthGlobal";
import { loginUser } from "../../context/actions/Auth.actions";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("ProfileContainer");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };

  return (
    <View style={styles.container}>
      <FormContainer>
        <Input
          placeholder={"Enter Email"}
          name={"Email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
        />
        <Input
          placeholder={"Enter Password"}
          name={"Password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}

          <TouchableHighlight
            style={styles.button}
            onPress={() => handleSubmit()}
            underlayColor="lightgrey"
            activeOpacity={1}
          >
            <View>
              <Text style={styles.buttonText}>Log in</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <Text style={styles.infoText}>
            Don't have an account yet? Join the Revolution below!
          </Text>
          <TouchableHighlight
            style={styles.button}
            onPress={() => props.navigation.navigate("Register")}
            underlayColor="lightgrey"
            activeOpacity={1}
          >
            <View>
              <Text style={styles.buttonText}>Register</Text>
            </View>
          </TouchableHighlight>
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A71E34",
  },
  buttonGroup: {
    width: "80%",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {},
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    alignSelf: "center",
  },
  infoText: {
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

export default Login;

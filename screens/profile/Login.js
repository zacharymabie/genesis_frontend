import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import Error from "../../shared/Error";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      console.log("success");
    }
  };

  return (
    <View style={styles.container}>
      <FormContainer title={"Login"}>
        <Input
          placeholder={"Enter Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
          style={styles.input}
        />
        <Input
          placeholder={"Enter Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <Button title="Login" onPress={() => handleSubmit()} />
        </View>
        <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
          <Text style>Don't have an account yet? Join the Revolution below!</Text>
          <Button
            title="Register"
            onPress={() => props.navigation.navigate("Register")}
          />
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#A71E34'
  },
  buttonGroup: {
    width: "80%",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
  input:{

  }
});

export default Login;

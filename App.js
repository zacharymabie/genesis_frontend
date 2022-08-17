import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import Login from "./screens/profile/Login";
import Register from "./screens/profile/Register";
import ProgramContainer from "./screens/programs/ProgramsContainer";

export default function App() {
  return (
    <View style={styles.container}>
      <ProgramContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Optima",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

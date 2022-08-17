import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Login from "./screens/profile/Login";
import Register from "./screens/profile/Register";
import ProgramContainer from "./screens/programs/ProgramsContainer";
import FeedContainer from "./screens/feed/FeedContainer";
import ProfileContainer from "./screens/profile/ProfileContainer"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileContainer />
    </SafeAreaView>
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

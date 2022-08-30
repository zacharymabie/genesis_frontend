import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import Auth from "./context/store/Auth";

import Main from "./navigators/Main";
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Auth>
      <Main />
    </Auth>
  );
}

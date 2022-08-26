import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

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

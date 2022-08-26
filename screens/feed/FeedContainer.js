import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Text,
  Image,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";

import PostContainer from "./PostContainer";
import NewPost from "./NewPost";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { NavigationHelpersContext } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// const data = require("../../assets/data/posts.json")

const { height, width } = Dimensions.get("window");

const FeedContainer = ({ navigation }) => {
  const [posts, setPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    getData()
  }, [])

  const getData = () => {
    setRefreshing(true)
    axios
      .get(`${baseURL}posts`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.log("API Error");
      })
    .finally(setRefreshing(false))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.main}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostContainer
                key={item.id}
                name={item.author.name}
                profilePhoto={item.author.profilePic}
                timestamp={item.timestamp}
                caption={item.caption}
                imagePost={item.image}
                likes={item.likes}
                comments={item.comments}
                postId={item.id}
                userId={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={() => getData()}
          />
        </View>

        <View style={styles.footer}>
          <Button onPress={() => navigation.navigate("NewPost")} title="New Post" />

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    maxHeight: (height / 10) * 9,
  },
  footer: {
    flex: 1,
    backgroundColor: "gainsboro",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    maxHeight: height / 10,
  },
});

export default FeedContainer;

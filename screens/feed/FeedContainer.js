import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";

import PostContainer from "./PostContainer";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const { height, width } = Dimensions.get("window");

const FeedContainer = ({ navigation }) => {
  const [posts, setPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    getData()
    return () => {
      setPost([])
    }
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
                userId={item.author.id}
              />
            )}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={() => getData()}
          />
        </View>

            
        <View style={styles.footer}>
        <TouchableHighlight
            style={styles.button}
            onPress={() => navigation.navigate("NewPost")}
            underlayColor="lightgrey"
            activeOpacity={1}
          >
              <Text style={styles.buttonText}>New Post</Text>
          </TouchableHighlight>
          {/* <Button onPress={() => navigation.navigate("NewPost")} title="New Post" /> */}

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85182A",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    backgroundColor: "#85182A",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    maxHeight: (height / 10) * 9,
  },
  footer: {
    flex: 1,
    backgroundColor: "#85182A",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    maxHeight: height / 10,
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

export default FeedContainer;

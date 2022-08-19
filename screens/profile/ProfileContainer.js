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
  TouchableHighlightComponent
} from "react-native";

import PostContainer from "../feed/PostContainer";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const { height, width } = Dimensions.get("window");

const ProfileContainer = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  axios
    .get(`${baseURL}users/62f8cd7b1df83bbe60782743`)
    .then((res) => {
      setUser(res.data);
    })
    .catch((error) => {
      console.log("API Error");
    });

  //{
  //     "_id": "62f8cd7b1df83bbe60782743",
  //     "username": "zachmabie",
  //     "name": "Zach",
  //     "email": "zachmabie@gmail.com",
  //     "isAdmin": true,
  //     "age": 21,
  //     "weight": 87,
  //     "height": 200,
  //     "profilePic": "http://127.0.0.1:4000/public/uploads/PPmosh.jpg-1660476162511.jpeg",
  //     "followed": [
  //         "62f8db4d9ad99740bee29711",
  //         "62f8db4d9ad99740bee29712"
  //     ],
  //     "following": [
  //         "62f8db4d9ad99740bee29715",
  //         "62f8db4d9ad99740bee29716"
  //     ],
  //     "__v": 0,
  //     "id": "62f8cd7b1df83bbe60782743"
  // }

  const userID = user.id;

  axios
    .get(`${baseURL}posts/user/${userID}`)
    .then((res) => {
      setPosts(res.data);
    })
    .catch((error) => {
      console.log("API Error");
    });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {user.follow ? user.followed.length : 0}
              </Text>
              <Text style={[styles.text, { fontSize: 16 }]}>Followers</Text>
            </View>
            <Image style={styles.profilePic} source={require()} />
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {user.following ? user.following.length : 0}
              </Text>
              <Text style={[styles.text, { fontSize: 16 }]}>Following</Text>
            </View>
          </View>

          <Text style={[styles.text, { fontSize: 26 }]}>{user.name}</Text>
          <Text style={[styles.text, { fontSize: 18 }]}>@{user.username}</Text>
          <Text style={[styles.bio]}>
            Bio here is my bio poopoo and peepee and balls. I like to poop and
            pee and workout :P I am a proper gym lad
          </Text>

          <View style={[styles.postInteractions]}>
            <Button onPress={console.log("penis")} title="Follow" />
            <Button onPress={console.log("balls")} title="Message" />
          </View>
        </View>
      </View>

      <View style={styles.postsContainer}>
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
            />
          )}
          keyExtractor={(item) => item.id}
        />
        {/* {posts ? posts.map(post => {
              return <PostContainer 
                  key={post.id}
                  name={post.author.name}
                  profilePhoto={post.author.profilePic}
                  timestamp={post.timestamp}
                  caption={post.caption}
                  imagePost={post.image}
                  likes={post.likes}
                  comments={post.comments}
              />
          }) : console.log("no data")} */}
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
  },
  profile: {
    flex: 1,
    backgroundColor: "gainsboro",
    alignItems: "center",
    width: width,
    maxHeight: height / 2,
  },
  profilePic: {
    marginLeft: 10,
    marginRight: 10,
    height: width / 3,
    width: width / 3,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  text: {
    fontWeight: "bold",
  },
  bio: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  postsContainer: {
    maxHeight: height / 2,
    justifyContent: "flex-end",
  },
  postInteractions: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ProfileContainer;

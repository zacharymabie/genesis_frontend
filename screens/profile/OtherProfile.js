import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable
} from "react-native";

import PostContainer from "../feed/PostContainer";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const { height, width } = Dimensions.get("window");

const OtherProfile = ({navigation, route}) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [uploadImage, setUploadImage] = useState("")
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false); //true means liked, false means not liked

  const userID = route.params.id
  const followerID = "62f8cd7b1df83bbe60782743"

    useEffect(() => {
    //get and set USER data    
    axios
        .get(`${baseURL}users/${userID}`)
        .then((res) => {
        setUser(res.data);
        })
        .catch((error) => {
        console.log("API Error1");
        });

        setUploadImage("")
    },[]);
    //GET and Set USER'S Posts
    axios
        .get(`${baseURL}posts/user/${userID}`)
        .then((res) => {
        setPosts(res.data);
        })
        .catch((error) => {
        console.log(`${userID}`)
        console.log("Alhamdulilah");
        });

    useEffect(() => {
        axios
        .get(`${baseURL}users/followers/${userID}`)
        .then((res) => {
            setFollowers(res.data);
        })
        .catch((error) => {
            console.log("API Error", error.response.data);
        });
        axios
        .get(`${baseURL}users/following/${followerID}`)
        .then((res) => {
            setFollowing(res.data);
        })
        .catch((error) => {
            console.log("API Error", error.response.data);
        });
        return(
            setFollowers([]),
            setFollowing([])
        )
    }, []); // 👈️ empty dependencies array

  const handleFollow = () => {
    const followerIDArr = followers.followed
    let followerArr = []
    followerIDArr.map(follower => {
        followerArr.push({
            user: follower,
            followedUser: userID
        })
    })
    console.log(`followerID:${followerID}`)
    console.log(`userID:${userID}`)
    if(!isFollowed){
      followerArr.push({
        user: followerID,
        followedUser: userID
      })
      setIsFollowed(true)
    } else {
      setIsFollowed(false)
    }
    //add follower
    axios.put(`${baseURL}users/newfollower/${userID}`,{
        followed: followerArr
      },{
          headers:{
              "Authorization" : `Bearer 62f8cd7b1df83bbe60782743`
          }
      }).then(res => {
          console.log(res);
          console.log(res.data)
      })
      .catch(error => console.log(error.response.data));
    
    //following
    const followingIDArr = following.following
    let followingArr = []
    followingIDArr.map(following => {
        followingArr.push({
            user: followerID,
            followedUser: following
        })
    })

    followingArr.push({
        user: followerID,
        followedUser: userID
    })

    //add following
    axios.put(`${baseURL}users/newfollowing/${followerID}`,{
        following: followingArr
      },{
          headers:{
              "Authorization" : `Bearer 62f8cd7b1df83bbe60782743`
          }
      }).then(res => {
          console.log(res);
          console.log(res.data)
      })
      .catch(error => console.log(error.response.data));
      
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <View style={{ alignItems: "center" }}>
                <Text style={[styles.text, { fontSize: 18 }]}>
                  {user.followed ? user.followed.length : 0}
                  {/* {followerCount} */}
                </Text>
                <Text style={[styles.text, { fontSize: 16 }]}>Followers</Text>
            </View>
              {uploadImage ? 
                <Image style={styles.profilePic} source={{uri: uploadImage}} />
                : user.profilePic != "" ?
                <Image style={styles.profilePic} source={{uri: user.profilePic}} />
                : <Image style={styles.profilePic} source={require("../../assets/user.png")} />
              }
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {user.following ? user.following.length : 0}
                {/* {followingCount} */}
              </Text>
              <Text style={[styles.text, { fontSize: 16 }]}>Following</Text>
            </View>
          </View>

          <Text style={[styles.text, { fontSize: 26 }]}>{user.name}</Text>
          <Text style={[styles.text, { fontSize: 18 }]}>@{user.username}</Text>
            <View>
              <Text style={[styles.bio,{color:"#fff"}]}>
                {user.bio}
              </Text>
            </View>

          <View style={[styles.postInteractions]}>
            <Pressable
              style={[styles.button, {backgroundColor:"white"}]}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.textStyle}>Login</Text>
            </Pressable>
            <Pressable
              style={[styles.button, {backgroundColor:"white"}]}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.textStyle}>Register</Text>
            </Pressable>
            <Pressable
              style={[styles.button, {backgroundColor:"white"}]}
              onPress={() => handleFollow()}
            >
              <Text style={styles.textStyle}>{isFollowed ? "Unfollow" : "Follow"}</Text>
            </Pressable>
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
              postId={item.id}
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
    </View >
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
    backgroundColor: "#A71E34",
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
    color: "#fff"
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
    backgroundColor:"#A71E34"
  },
  postInteractions: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width*.9
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:5
  },
  buttonSubmit: {
    backgroundColor: "blue",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input:{
    borderWidth: 1,
    borderRadius:10,
    width: width*.85,
    height: width*.25,
    padding: 8,
    fontSize: 18,
    marginBottom: 10
},
});

export default OtherProfile;

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
import { TouchableHighlight } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

const OtherProfile = ({navigation, route}) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [uploadImage, setUploadImage] = useState("")
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false); //true means liked, false means not liked
  const [refreshing, setRefreshing] = useState(false)
  // const [followerCount, setFollowerCount] = useState(0)


  const userID = route.params.id
  const followerID = "62f8cd7b1df83bbe60782743"

  useEffect(() => {
    getUserData();
    getUserPosts();
    getFollowers();
    getFollowing();
    // setFollowerCount(user.followed ? user.followed.length : 0)

    return()=>{
      setUser({})
      setPosts([])
      setUploadImage("")
      setFollowers([])
      setFollowing([])
      setIsFollowed(false)
      // setFollowerCount(0)
    }
  }, []); 

  const fetchData = () => {
    setRefreshing(true)
    getUserData()
    getUserPosts()
    setRefreshing(false)
  }
    
  //get and set USER data    
  const getUserData = () => {
    axios
        .get(`${baseURL}users/${userID}`)
        .then((res) => {
        setUser(res.data);
        })
        .catch((error) => {
        console.log("API Error1");
        });
  }
  //GET and Set USER'S Posts
  const getUserPosts = () => {
    axios
        .get(`${baseURL}posts/user/${userID}`)
        .then((res) => {
        setPosts(res.data);
        })
        .catch((error) => {
        console.log(`${userID}`)
        console.log("Alhamdulilah");
        })
  }

  const getFollowers = () => {
    axios
    .get(`${baseURL}users/followers/${userID}`)
    .then((res) => {
        setFollowers(res.data.followed);
    })
    .catch((error) => {
        console.log("API Error", error.response.data);
    });
  }

  const getFollowing = () => {
    axios
    .get(`${baseURL}users/following/${followerID}`)
    .then((res) => {
        setFollowing(res.data.following);
    })
    .catch((error) => {
        console.log("API Error", error.response.data);
    });
  }

  const handleFollow = () => {
    const followerIDArr = followers
    let followerArr = []
    followerIDArr.map(follower => {
        followerArr.push({
            user: follower.user.id
        })
    })
    console.log(`followerID:${followerID}`)
    console.log(`userID:${userID}`)
    if(!isFollowed){
      followerArr.push({
        user: followerID,
        // followedUser: userID
      })
      // let count = followerCount
      // setFollowerCount(count++)
      setIsFollowed(true)
    } else {
      // let count = followerCount
      // setFollowerCount(count--)
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
    const followingIDArr = following
    let followingArr = []
    followingIDArr.map(following => {
        followingArr.push({
            user: following.user.id
            // followedUser: following
        })
    })

    followingArr.push({
        user: userID,
        // followedUser: userID
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
            <TouchableOpacity 
            onPress={()=>navigation.navigate("FollowerContainer", {userId:userID, followType:"followers"})}
            style={{ alignItems: "center" }}>
                <Text style={[styles.text, { fontSize: 18 }]}>
                  {user.followed ? user.followed.length : 0}
                  {/* {followerCount} */}
                </Text>
                <Text style={[styles.text, { fontSize: 16 }]}>Followers</Text>
            </TouchableOpacity>
              {uploadImage ? 
                <Image style={styles.profilePic} source={{uri: uploadImage}} />
                : user.profilePic != "" ?
                <Image style={styles.profilePic} source={{uri: user.profilePic}} />
                : <Image style={styles.profilePic} source={require("../../assets/user.png")} />
              }
            <TouchableOpacity 
            onPress={()=>navigation.navigate("FollowerContainer", {userId:userID, followType:"following"})}
            style={{ alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {user.following ? user.following.length : 0}
                {/* {followingCount} */}
              </Text>
              <Text style={[styles.text, { fontSize: 16 }]}>Following</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { fontSize: 26 }]}>{user.name}</Text>
          <Text style={[styles.text, { fontSize: 18 }]}>@{user.username}</Text>
            <View>
              <Text style={[styles.bio,{color:"#fff"}]}>
                {user.bio}
              </Text>
            </View>

          <View style={[styles.postInteractions]}>
            {/* <Pressable
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
            </Pressable> */}
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
          refreshing={refreshing}
          onRefresh={() => fetchData()}
        />
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

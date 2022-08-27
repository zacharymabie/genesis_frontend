import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const { width } = Dimensions.get("window");

const PostContainer = (props) => {
  const [likesData, setLikesData] = useState({});
  const [liked, setLiked] = useState(false); //true means liked, false means not liked
  const [likeCount, setLikeCount] = useState(0)

  const navigation = useNavigation();
  const { name, profilePhoto, timestamp, caption, imagePost, likes, comments, postId, userId } =
    props;

  const profilePic = profilePhoto != ""
    ? {uri : profilePhoto}
    : require("../../assets/user.png");

  useEffect(() => {
    getLikesData()
    setLikeCount(likes.length)
    return(()=>{
      setLikesData({})
      setLikeCount(0)
    })
  }, []); // 👈️ empty dependencies array

  const getLikesData = () => {
    axios
    .get(`${baseURL}posts/likes/${postId}`)
    .then((res) => {
      setLikesData(res.data.likes);
    })
    .catch((error) => {
      console.log("API Error", error.response.data);
    });
  }

  const handleLike = () => {
    //GET Current Likes on post
    const likesArr = likesData
    let userIdArr = []
    likesArr.map(like => {
      userIdArr.push({user: like.user.id})
    })

    if(!liked){
      const newLike =  "62f627a8fc65975e12b69c05"
      userIdArr.push({user: newLike})
      let count = likeCount
      setLikeCount(count+1)
      setLiked(true)
    } else {
      setLikeCount(likes.length)
      setLiked(false)
    }

    const {data} = axios.put(`${baseURL}posts/like/${postId}`,{
      // likes: [{user: "62f627a8fc65975e12b69c05"}]
      likes: userIdArr
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
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate("OtherProfile", {id: userId})}>
            <Image
              style={styles.profileImage}
              source={profilePic}
            />
          </TouchableOpacity>
          <View
            style={[
              styles.leftContainer,
              { flexDirection: "column", padding: 5 },
            ]}
          >
            <TouchableOpacity onPress={()=>navigation.navigate("OtherProfile", {id: userId})}>
              <Text
                style={[
                  styles.text,
                  { fontWeight: "bold", margin: 0, width: width * 0.65 },
                ]}
              >
                {name}
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { fontSize: 16, margin: 0, width: width * 0.65 },
              ]}
            >
              {timestamp.substring(0, 10)}
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Button onPress={() => alert("button")} title="..." />
        </View>
      </View>

      <View
        style={[
          styles.postMain,
          { maxHeight: caption.length > 140 ? width + 190 : width + 100 },
        ]}
      >
        <Text style={styles.text}>{caption}</Text>
        <Image
          source={{uri:imagePost}}
          style={styles.image}
        />
      </View>

      <View style={[{ margin: 5, flexDirection: "row", alignItems: "center" }]}>
        <TouchableOpacity onPress={() => navigation.navigate("LikeContainer", {likes: likes, postId: postId})}>
          <Text style={{ fontSize: 16 }}>{likeCount} Likes | </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CommentContainer", {comments: comments, postId: postId})}>
          <Text style={{ fontSize: 16 }}>{comments.length} Comments</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.postInteractions]}>
        <Pressable
          style={[styles.button]}
          onPress={() => handleLike()}
        >
          <Text style={styles.textStyle}>{liked ?<Ionicons name="ios-heart-dislike" size={26} color="white" /> : <Ionicons name="ios-heart" size={26} color="white" />}</Text>
        </Pressable>
        <Pressable
          style={[styles.button]}
          onPress={() => navigation.navigate("CommentContainer", {comments: comments, postId: postId})}
        >
          <Text style={styles.textStyle}><FontAwesome name="comments" size={26} color="white" /></Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    width: "100%",
    maxHeight: Dimensions.get("window").width + 320,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 5,
  },
  profileImage: {
    marginTop: 5,
    marginBottom: 5,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  postHeader: {
    maxHeight: width * 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postMain: {
    flexDirection: "column",
    alignItems: "left",
    width: width,
  },
  postInteractions: {
    maxHeight: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  leftContainer: {
    paddingLeft: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 10,
  },
  image: {
    width:width,
    height:width,
  },
  text: {
    margin: 8,
    fontSize: 18,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin:5,
    backgroundColor: "#85182A"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default PostContainer;

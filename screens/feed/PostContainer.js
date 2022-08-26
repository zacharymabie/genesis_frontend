import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
const { width } = Dimensions.get("window");

const PostContainer = (props) => {
  const [likesData, setLikesData] = useState({});
  const [liked, setLiked] = useState(false); //true means liked, false means not liked

  const navigation = useNavigation();
  const { name, profilePhoto, timestamp, caption, imagePost, likes, comments, postId, userId } =
    props;

  const profilePic = profilePhoto != ""
    ? {uri : profilePhoto}
    : require("../../assets/user.png");
  // const image = imagePost != "" ? {uri:imagePost} : require("../../assets/photos/3.png");

  useEffect(() => {
    axios
    .get(`${baseURL}posts/likes/${postId}`)
    .then((res) => {
      setLikesData(res.data);
    })
    .catch((error) => {
      console.log("API Error", error.response.data);
    });
    return(
      setLikesData({})
    )
  }, []); // 👈️ empty dependencies array

  const handleLike = () => {
    //GET Current Likes on post
    const likesArr = likesData.likes
    let userIdArr = []
    likesArr.map(like => {
      userIdArr.push({user: like.user.id})
    })

    if(!liked){
      const newLike =  "62f627a8fc65975e12b69c05"
      userIdArr.push({user: newLike})
      setLiked(true)
    } else {
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
          {/* <Image style={styles.profileImage} source={{uri: profilePic}}/> */}
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
        {/* <Image style={styles.image} source={{uri: imagePost}}/> */}
      </View>

      <View style={[{ margin: 5, flexDirection: "row", alignItems: "center" }]}>
        {/* <Text style={{fontSize:16}}>{likes.length} Likes | {comments.length} Comments</Text> */}
        <TouchableOpacity onPress={() => navigation.navigate("LikeContainer", {likes: likes})}>
          <Text style={{ fontSize: 16 }}>{likes.length} Likes | </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CommentContainer", {comments: comments, postId: postId})}>
          <Text style={{ fontSize: 16 }}>{comments.length} Comments</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.postInteractions]}>
        <Button onPress={() => handleLike()} title={liked ? "Unlike" : "Like"} />
        <Button onPress={() => console.log("Comment")} title="Comment" />
        <Button onPress={() => console.log("Share")} title="Share" />
        <Button onPress={() => console.log("Send")} title="Send" />
      </View>

      {/* {renderComments && <CommentContainer comments={comments} />} */}
      {/* {renderLikes && navigation.navigate("LikeContainer", {likes: likes})} */}
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
});

export default PostContainer;

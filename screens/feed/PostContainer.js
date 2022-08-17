import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    Button,
    Dimensions,
    TouchableOpacity
  } from "react-native";
const { height, width } = Dimensions.get('window')

import CommentContainer from "./CommentContainer";
import LikeContainer from "./LikeContainer";

const PostContainer = (props) => {
    const [renderComments, setRenderComments] = useState(false);
    const [renderLikes, setRenderLikes] = useState(false);

    const {name, profilePhoto, timestamp, caption, imagePost, likes, comments} = props;

    // console.log(
    //     "BONKER//////////////////////////////////////",
    //     profilePhoto,
    //     imagePost,
    // );

    const profilePic = profilePhoto ? profilePhoto : require('../../assets/img.png');
    const image = imagePost ? imagePost : '../../assets/img.png';

  return (
    <View style={styles.postContainer}>
        <View style={styles.postHeader}>
            <View style={styles.leftContainer}>

                <Image style={styles.profileImage} source={{uri: "/Users/ZachMabie/Desktop/genesis_frontend/assets/photos/7.png"}}/>
                {/* <Image style={styles.profileImage} source={{uri: profilePic}}/> */}
                <View style={[styles.leftContainer, {flexDirection: 'column', padding:5}]}>
                    <Text style={[styles.text,{fontWeight:'bold', margin:0, width:width * .65}]}>{name}</Text>
                    <Text style={[styles.text,{fontSize:16, margin:0, width:width * .65}]}>{timestamp.substring(0,10)}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Button onPress={() => alert('button')} title="..."/>
            </View>
        </View>

        <View style={[styles.postMain, {maxHeight: caption.length > 140 ? width + 190 : width + 100}]}>
            <Text style={styles.text}>{caption}</Text>
            <Image style={styles.image} source={require("/Users/ZachMabie/Desktop/genesis_frontend/assets/photos/2.png")}/>
            {/* <Image style={styles.image} source={{uri: imagePost}}/> */}
        </View>

        <View style={[{margin:5, flexDirection:'row', alignItems:'center'}]}>
            {/* <Text style={{fontSize:16}}>{likes.length} Likes | {comments.length} Comments</Text> */}
            <TouchableOpacity 
                onPress={()=>setRenderLikes(true)}
            >
                <Text style={{fontSize:16}}>{likes.length} Likes | </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setRenderComments(true)}
            >
                <Text style={{fontSize:16}}>{comments.length} Comments</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.postInteractions]}>
            <Button onPress={()=>console.log('Like')} title="Like"/>
            <Button onPress={()=>console.log('Comment')} title="Comment"/>
            <Button onPress={()=>console.log('Share')} title="Share"/>
            <Button onPress={()=>console.log('Send')} title="Send"/>
        </View>

        {renderComments &&  <CommentContainer comments={comments}/>}
        {renderLikes &&  <LikeContainer likes={likes}/>}
    </View>
  );
};

const styles = StyleSheet.create({
    postContainer:{
        flex: 1,
        width: "100%",
        maxHeight: Dimensions.get('window').width + 320,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 10,
        marginBottom: 5
    },
    profileImage: {
        marginTop:5,
        marginBottom:5,
        width: 60,
        height: 60,
        borderRadius:100,
    },
    postHeader: {
        maxHeight: width*.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    postMain:{
        flexDirection: 'column',
        alignItems: 'left',
        width: width,
        paddingLeft: 10,
        paddingRight:10
    },
    postInteractions:{
        maxHeight: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
    },
    leftContainer: {
        paddingLeft:10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
      },
    image:{
        maxWidth: "100%",
        maxHeight: Dimensions.get('window').width,
    },
    text:{
        margin:8,
        fontSize:18,
    }
  });
  
export default PostContainer;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Text,
  Image
} from "react-native";

import PostContainer from "./PostContainer";
const data = require("../../assets/data/posts.json")

var { width } = Dimensions.get('window')

const FeedContainer = () => {
    const [posts, setPost] = useState(data);

    return (
    <ScrollView>
        <View style={styles.container}>
            {posts.map(post => {
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
            })}
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'gainsboro',
      alignItems: 'center',
      justifyContent: 'center',
      width: width,
  }
});

export default FeedContainer;


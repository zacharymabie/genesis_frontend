import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Text,
  Image,
  RefreshControl
} from "react-native";

import Like from "./Like";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

var { width } = Dimensions.get('window')

const LikeContainer = ({route}) => {
    const [data, setData] = useState(()=>[])
    const [postId, setPostId] = useState("")
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        const {likes, postId} = route.params 
        setData(likes)
        setPostId(postId)
      return () => {
        setData([])
        setPostId("")
      }
    }, []); // 👈️ empty dependencies array
    
    const getData = () => {
      setRefreshing(true)
      axios
        .get(`${baseURL}posts/likes/${postId}`)
        .then((res) => {
          setData(res.data.likes);
        })
        .catch((error) => {
          console.log("API Error");
        })
      .finally(setRefreshing(false))
    }

    
    return (
    <ScrollView
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={getData}
      />
    }>
        <View style={styles.container}>
            {data.length > 0 ? data.map(like => {
                    return <Like 
                        key={like.id}
                        name={like.user.username}
                        userId={like.user.id}
                        profilePic={like.user.profilePic}
                    />
            }) : 
            <Text>No Likes</Text>}
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#85182A',
      alignItems: 'center',
      justifyContent: 'center',
      width: width,
  }
});

export default LikeContainer;


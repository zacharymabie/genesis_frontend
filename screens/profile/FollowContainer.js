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

import Follower from "./Follower";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

var { width } = Dimensions.get('window')

const FollowContainer = ({route}) => {
    const [data, setData] = useState(()=>[])
    const [userId, setUserId] = useState("")
    const [refreshing, setRefreshing] = useState(false);


    useEffect(() => {
        const {userId} = route.params 
        console.log(`userID:::::${userId}`)
        getData()
        setUserId(userId)
      return () => {
        setData([])
        setUserId("")
      }
    }, []); // 👈️ empty dependencies array
    
    const getData = () => {
      setRefreshing(true)
      console.log(`${baseURL}users/followers/${userId}`)
      axios
        .get(`${baseURL}users/followers/${userId}`)
        .then((res) => {
          setData(res.data.followed);
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
            {data.length > 0 ? data.map(follower => {
                    return <Follower 
                        key={follower.id}
                        name={follower.user.username}
                        userId={follower.user.id}
                        profilePic={follower.user.profilePic}
                    />
            }) : 
            <Text>No Followers</Text>}
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

export default FollowContainer;


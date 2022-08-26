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

import Like from "./Like";


var { width } = Dimensions.get('window')

const LikeContainer = ({route}) => {
    const [data, setData] = useState(()=>[])

    useEffect(() => {
        const {likes} = route.params 
        setData(likes)
      }, []); // 👈️ empty dependencies array
    
    console.log(data)
    
    return (
    <ScrollView>
        <View style={styles.container}>
            {data.length > 0 ? data.map(like => {
                    return <Like 
                        key={like.id}
                        name={like.user.username}
                        userId={like.user.id}
                        profilePhoto={like.user.profilePic}
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


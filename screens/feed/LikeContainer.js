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
            {data.map(like => {
                    return <Like 
                        key={like.id}
                        name={like.id}
                        // profilePhoto={like.user.profilePic}
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

export default LikeContainer;


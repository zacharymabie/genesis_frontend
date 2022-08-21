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

import Comment from "./Comment";


var { width } = Dimensions.get('window')

const CommentContainer = ({route}) => {
    const [data, setData] = useState(()=>[])

    useEffect(() => {
        const {comments} = route.params 
        setData(comments)
      }, []); // 👈️ empty dependencies array
    
    console.log(data)
    
    return (
    <ScrollView>
        <View style={styles.container}>
            {data.length > 0 ? data.map(comment => {
                    return <Comment 
                        key={comment.id}
                        name={comment.author.name}
                        profilePhoto={comment.author.profilePic}
                        timestamp={comment.timestamp}
                        content={comment.content}
                    />
            }) : 
            <Text>No Comments</Text>}
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

export default CommentContainer;


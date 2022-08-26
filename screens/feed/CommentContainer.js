import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Text,
  Image,
  Button,
  Modal,
  Pressable,
  RefreshControl
} from "react-native";

import Comment from "./Comment";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

var { height, width } = Dimensions.get('window')

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CommentContainer = ({route}) => {
    const [data, setData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [text, onChangeText] = useState("")
    const [postId, setPostId] = useState("")
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const getData = () => {
      setRefreshing(true)
      axios
        .get(`${baseURL}posts/comments/${postId}`)
        .then((res) => {
          setData(res.data.comments);
        })
        .catch((error) => {
          console.log("API Error");
        })
      .finally(setRefreshing(false))
    }

    useEffect(() => {
        const {comments, postId} = route.params 
        setData(comments)
        setPostId(postId)

        return () => {
          setData([])
          setPostId("")
        }

      }, []); // 👈️ empty dependencies array
    
    const handlePostComment = () => {

      let commentsArr = []
      data.map(comment => {
        commentsArr.push({
          author: comment.author.id,
          content: comment.content
        })
      })

      commentsArr.push({
        author: "62f8cd7b1df83bbe60782743",
        content: text
      })

      axios.put(`${baseURL}posts/comment/${postId}`,{
        comments: commentsArr
      },{
          headers:{
              "Authorization" : `Bearer 62f8cd7b1df83bbe60782743`
          }
      }).then(res => {
          console.log(res);
          console.log(res.data)
      })
      .catch(error => console.log(error.response.data));

      setModalVisible(!modalVisible) //Close Popup
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
            {data.length > 0 ? data.map(comment => {
              return <Comment 
              key={comment.id}
              name={comment.author.name}
              username={comment.author.username}
              userId={comment.author.id}
              profilePhoto={comment.author.profilePic}
              timestamp={comment.timestamp}
              content={comment.content}
              />
            }) : 
            <Text style={{color:"#fff"}}>No Comments</Text>}
        </View>
        <View style={styles.footer}>
          <Pressable
            style={[styles.button,{backgroundColor:"#fff"}]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.textStyle, {color:"black"}]}>New Comment</Text>
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput 
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                  multiline={true}
                />
                <View style={{alignItems: 'center', justifyContent: 'space-evenly', flexDirection:'row'}}>
                  <Pressable
                    style={[styles.button]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button]}
                    onPress={() => handlePostComment()}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
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
  },
  footer: {
    flex: 1,
    backgroundColor: "#85182A",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    maxHeight: height / 10,
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
    margin:5,
    backgroundColor:"#85182A"
  },
  textStyle: {
    color: "white",
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

export default CommentContainer;


import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    Pressable

  } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

var { height, width } = Dimensions.get('window')

const NewPost = ({navigation}) => {
    const [text, onChangeText] = useState("")
    const [uploadImage, setUploadImage] = useState("")
    const [image, setImage] = useState({url:'',public_id:''})
    const [postData, setPostData] = useState({})


    const handleUpload = async () => {
        let permissionResult = 
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted){
            alert("Camera access is required")
            return
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4,3],
            base64: true,
        });
        if(pickerResult.cancelled){
            return;
        }

        let base64Image = `data:image/jpg;base64,${pickerResult.base64}`
        setUploadImage(base64Image)

    }

    const handlePost = () => {
        setPostData({
            author: "62f8cd7b1df83bbe60782743", //TODO: get author
            caption:text,
            image:uploadImage,
            likes:[],
            comments:[]
        })
        const {data} = axios.post("http://127.0.0.1:4000/api/v1/posts",{
            author: "62f8cd7b1df83bbe60782743", //TODO: get author
            caption:text,
            image:uploadImage,
            likes:[],
            comments:[]
        },{
            headers:{
                "Authorization" : `Bearer 62f8cd7b1df83bbe60782743`
            }
        }).then(res => {
            console.log(res);
            console.log(res.data)
        })
        .catch(error => console.log(error.response.data));
        navigation.navigate("FeedContainer")
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.postContainer}>

                <View style={styles.body}>
                    {image && image.url ? (
                        <Image
                        source={{uri: image}}
                        style={{
                            width:width,
                            height:width,
                            marginVertical: 20
                        }}
                    />
                    ): uploadImage ? 
                        <Image
                            source={{uri: uploadImage}}
                            style={{
                                width: width,
                                height: width,
                                marginVertical: 20
                            }}
                        />
                    : <View>
                    </View>}
                    <Pressable
                        style={[styles.buttonSmall]}
                        onPress={() => handleUpload()}
                    >
                        <Text style={styles.textStyle}>Upload Photo</Text>
                    </Pressable>
                    {/* <Button onPress={()=>handleUpload()} title="Choose Photo"/> */}
                    <Text style={styles.text}>Caption:</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        multiline={true}
                    />
                </View>
                <View style={{width:width}}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => handlePost()}
                        underlayColor="lightgrey"
                        activeOpacity={1}
                    >
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableHighlight>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#85182A",
        justifyContent:'center',
        alignItems:'center'
    },  
    postContainer:{
        flex: 1,
        width: "100%",
        maxHeight: Dimensions.get('window').width + 320,
        backgroundColor: "#85182A",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 10,
        marginBottom: 5
    },
    body:{
        alignItems: "center",
        justifyContent: "center",
    },
    input:{
        borderWidth: 1,
        borderRadius:10,
        width: width*.95,
        height: width*.3,
        padding: 8,
        fontSize: 18,
        backgroundColor:"#fff"
    },
    text:{
        fontSize:16,
        fontWeight: 'bold',
        color:"#fff"
    },
    buttonSmall: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin:5,
        backgroundColor:"#fff"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:18
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        margin: 10,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "white",
        width: "80%",
        alignSelf: "center",
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "black",
        alignSelf: "center",
      },
  });
  
export default NewPost;

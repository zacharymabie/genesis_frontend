import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    Dimensions,
    TouchableOpacity
  } from "react-native";
import * as ImagePicker from 'expo-image-picker';

var { height, width } = Dimensions.get('window')

const NewPost = () => {
    const [text, onChangeText] = useState("Placeholder")

    const [uploadImage, setUploadImage] = useState("")
    const [image, setImage] = useState({url:'',public_id:''})

    const chooseImage = () => {
        console.warn("choose image")
    }

    const takeImage = () => {
        console.warn("take image")

    }

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


    return (
        <View style={styles.postContainer}>
            <View style={styles.header}>
                <Text style={styles.text}>New Post</Text>
            </View>
            <View style={styles.body}>
                {image && image.url ? (
                    <Image
                    source={{uri: image}}
                    style={{
                        width:190,
                        height:190,
                        borderRadius: 100,
                        marginVertical: 20
                    }}
                />
                ): uploadImage ? 
                    <Image
                        source={{uri: uploadImage}}
                        style={{
                            width:190,
                            height:190,
                            borderRadius: 100,
                            marginVertical: 20
                        }}
                    />
                : <View>
                    <Text>Image Here</Text>
                </View>}
                <Button onPress={()=>handleUpload()} title="Choose Photo"/>
                <Button onPress={()=>takeImage()} title="Take Photo"/>
                <Text style={styles.text}>Caption:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    multiline={true}
                />
            </View>
            <View style={styles.footer}>
                <Button onPress={()=>""} title="Create"/>
            </View>

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
        justifyContent: "space-evenly",
        marginTop: 10,
        marginBottom: 5
    },
    header:{

    },
    body:{
        alignItems: "center",
        justifyContent: "center",
    },
    footer:{

    },
    input:{
        borderWidth: 1,
        borderRadius:10,
        width: width*.8,
        height: width*.3,
        padding: 8,
        fontSize: 18
    },
    text:{
        fontSize:16,
        fontWeight: 'bold'
    }
  });
  
export default NewPost;

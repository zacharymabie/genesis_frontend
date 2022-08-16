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


var { height, width } = Dimensions.get('window')

const Comment = (props) => {

    const {name, profilePhoto, timestamp, content} = props;

  return (
    <View style={styles.postContainer}>
        <View style={styles.postHeader}>
            <View style={styles.leftContainer}>

                <Image style={styles.profileImage} source={{uri: "/Users/ZachMabie/Desktop/genesis_frontend/assets/photos/5.png"}}/>
                <View style={[styles.leftContainer, {flexDirection: 'column', padding:5}]}>
                    <Text style={[styles.text,{fontWeight:'bold', margin:0, width:width * .65}]}>{name}</Text>
                    <Text style={[styles.text,{fontSize:16, margin:0, width:width * .65}]}>{timestamp.substring(0,10)}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <Button onPress={() => alert('button')} title="..."/>
            </View>
        </View>

        <View style={[styles.postMain, {maxHeight: content.length > 140 ? width + 190 : width + 100}]}>
            <Text style={styles.text}>{content}</Text>
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
  
export default Comment;

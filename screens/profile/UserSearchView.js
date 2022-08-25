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

const UserSearchView = (props) => {

    const {name, username, profilePic} = props;

  return (
    <View style={styles.postContainer}>
        <View style={styles.postHeader}>
            <View style={styles.leftContainer}>
                <Image style={styles.profileImage} source={profilePic != "" ? {uri:profilePic} : require("../../assets/user.png")}/>
                <View style={[styles.textContainer]}>
                    <Text style={[styles.text,{fontWeight:'bold', margin:0, width:width * .65}]}>{name}</Text>
                    <Text style={[styles.text,{fontSize:16, margin:0, width:width * .65}]}>@{username}</Text>
                </View>
            </View>
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
    leftContainer: {
        paddingLeft:10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    text:{
        margin:8,
        fontSize:18,
    },
    textContainer: {
        paddingLeft:10,
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column', 
        padding:5,
    },

  });
  
export default UserSearchView;

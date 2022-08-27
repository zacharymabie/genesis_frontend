import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
  } from "react-native";
import { useNavigation } from "@react-navigation/native";


var { height, width } = Dimensions.get('window')

const Follower = (props) => {

    const {profilePic, name, userId} = props;
    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate("OtherProfile", {id: userId})
    }

  return (
    <View style={styles.postContainer}>
        <View style={styles.postHeader}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={()=>handleNavigate()}>
                    <Image style={styles.profileImage} source={{uri: profilePic}}/>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>handleNavigate()}
                style={[styles.leftContainer, {flexDirection: 'column', padding:5}]}>
                    <Text style={[styles.text,{fontWeight:'bold', margin:0, width:width * .65}]}>{name}</Text>
                </TouchableOpacity>
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
    }
  });
  
export default Follower;

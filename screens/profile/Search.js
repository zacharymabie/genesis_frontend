import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import UserSearchView from "./UserSearchView";
import { useNavigation } from "@react-navigation/native";


const { height, width } = Dimensions.get("window");

const Search = () => {
    const [filteredData, setFilteredData] = useState([])
    const [masterData, setMasterData] = useState([])
    const [search, setSearch] = useState('')
    const navigation = useNavigation()

    useEffect(()=>{
        fetchData();
        return () => {
            setFilteredData([])
            setMasterData([])
        }
    },[])

    // useLayoutEffect(()=>{

    //     navigation.setOptions({
    //         headerTransparent:false,
    //         headerSearchBarOptions:{
    //             placeholder:"Search",
    //             onChangeText: (event) => {
    //                 searchFilter(event.nativeEvent.text)
    //             },
    //             autoCapitalize: false
    //         }
    //     })

    // },[navigation])


    const fetchData = () => {
        axios.get(`${baseURL}users`)
        .then((res) => {
          setFilteredData(res.data);
          setMasterData(res.data)
        })
        .catch((error) => {
          console.log("GET Error");
        });
    }

    const ItemSeparatorView = () => {
        return(
            <View
            style={{
                    height:0.5, width: width, backgroundColor:"#c8c8c8"
                }}
            />
        )
    }

    const searchFilter = (text) => {
        if(text){
            const newData = masterData.filter((item) => {
                const usernameData = item.username ? item.username.toUpperCase() : "".toUpperCase()
                const textData = text.toUpperCase()
                return usernameData.includes(textData)
            })
            console.log("TEXT",text)
            console.log("NEWDATA:::",newData)
            setFilteredData(newData)
            setSearch(text)
            console.log("FilteredDATA",filteredData)
        } else {
            setFilteredData(masterData)
            setSearch(text)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
                <TextInput 
                    style={styles.textInput}
                    value={search}
                    onChangeText={text => searchFilter(text)}
                    autoCapitalize={false}
                />
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={()=>navigation.navigate("OtherProfile", {id: item.id})}
                    >
                        <UserSearchView
                            key={item.id}
                            name={item.name}
                            username={item.username}
                            profilePic={item.profilePic}
                        />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={ItemSeparatorView}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height:50,
    width:width*.95,
    padding:5,
    paddingLeft:15,
    borderWidth:2.5,
    borderRadius:25,
    borderColor:"#A11D33",
    backgroundColor:"#fff",
    fontSize:22,
  }
});

export default Search;

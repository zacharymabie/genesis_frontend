import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import UserSearchView from "./UserSearchView";


const { height, width } = Dimensions.get("window");

const Search = ({ navigation }) => {
    const [filteredData, setFilteredData] = useState([])
    const [masterData, setMasterData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(()=>{
        fetchData();
        return () => {
        
        }
    },[])

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
                const itemData = item.username.toUpperCase()
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
            setSearch(text)
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
    width:width*.9,
    padding:5,
    borderWidth:2,
    borderRadius:5,
    borderColor:"#A11D33",
    backgroundColor:"#fff"
  }
});

export default Search;

import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";

import PostContainer from "../feed/PostContainer";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import * as ImagePicker from "expo-image-picker";

import AuthGlobal from "../../context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../../context/actions/Auth.actions";
import { set } from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const ProfileContainer = ({ navigation, route }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [uploadImage, setUploadImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");

  const [userID, setUserID] = useState("");
  //Auth code

  useEffect(() => {
    setImagePicker()
    return () => {
      setUploadImage("");
    }
  }, []);

  const context = useContext(AuthGlobal);
  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      navigation.navigate("Login");
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        let user_id = context.stateUser.user.userId;
        setUserID(user_id);
        if (user_id) {
          axios
            .get(`${baseURL}users/${user_id}`)
            .then((res) => {
              setUser(res.data);
            })
            .catch((error) => {
              console.log("API Error1");
            });
          axios
            .get(`${baseURL}posts/user/${user_id}`)
            .then((res) => {
              setPosts(res.data);
            })
            .catch((error) => {
              console.log(`${userID}`);
              console.log("Alhamdulilah");
            });
        }
      })
      .catch((error) => console.log(error));
  }, [context.stateUser.isAuthenticated]);

  const refresh = () => {
    axios
    .get(`${baseURL}users/${context.stateUser.user.userId}`)
    .then((res) => {
      setUser(res.data);
    })
    .catch((error) => {
      console.log("API Error1");
    });
  axios
    .get(`${baseURL}posts/user/${context.stateUser.user.userId}`)
    .then((res) => {
      setPosts(res.data);
    })
    .catch((error) => {
      console.log(`${userID}`);
      console.log("Alhamdulilah");
    });
  }

  const setImagePicker = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera access is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.cancelled) {
      return;
    }
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
  }

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Camera access is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.cancelled) {
      return;
    }
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);
    // handleChangePic();
    const { data } = axios
    .put(
      `${baseURL}users/setprofilepic/${userID}`,
      {
        image: base64Image,
      },
      {
        headers: {
          Authorization: `Bearer 62f8cd7b1df83bbe60782743`,
        },
      }
    )
    .then((res) => {
      console.log("WEHHHHH WEHHHHHHh")
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => console.log(error.response.data));
  };

  // const handleChangePic = () => {
  //   const { data } = axios
  //     .put(
  //       `${baseURL}users/setprofilepic/${userID}`,
  //       {
  //         image: uploadImage,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer 62f8cd7b1df83bbe60782743`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("WEHHHHH WEHHHHHHh")
  //       console.log(res);
  //       console.log(res.data);
  //     })
  //     .catch((error) => console.log(error.response.data));
  // };

  const handleChangeBio = () => {
    axios
      .put(
        `${baseURL}users/setbio/${userID}`,
        {
          bio: text,
        },
        {
          headers: {
            Authorization: `Bearer 62f8cd7b1df83bbe60782743`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((error) => console.log(error.response.data));

    setModalVisible(!modalVisible); //Close Modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("FollowerContainer", {userId:userID, followType:"followers"})}
            style={{ alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {user.follow ? user.followed.length : 0}
              </Text>
              <Text style={[styles.text, { fontSize: 16 }]}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUpload()}>
              {uploadImage ? (
                <Image
                  style={styles.profilePic}
                  source={{ uri: uploadImage }}
                />
              ) : user.profilePic != "" ? (
                <Image
                  style={styles.profilePic}
                  source={{ uri: user.profilePic }}
                />
              ) : (
                <Image
                  style={styles.profilePic}
                  source={require("../../assets/user.png")}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>navigation.navigate("FollowerContainer", {userId:userID, followType:"following"})}
            style={{ alignItems: "center" }}>
              <Text style={[styles.text, { fontSize: 18 }]}>
                {user.following ? user.following.length : 0}
              </Text>
              <Text style={[styles.text, { fontSize: 16 }]}>Following</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.text, { fontSize: 26 }]}>{user.name}</Text>
          <Text style={[styles.text, { fontSize: 18 }]}>@{user.username}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={[styles.bio, { color: "#fff" }]}>
              {text != "" ? text : user.bio}
            </Text>
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
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                    }}
                  >
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonSubmit]}
                      onPress={() => handleChangeBio()}
                    >
                      <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>

          <View style={[styles.postInteractions]}>
            <Pressable
              style={[styles.button, { backgroundColor: "white" }]}
              onPress={() => {
                AsyncStorage.removeItem("jwt");
                logoutUser(context.dispatch);
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.textStyle}>Logout</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "white" }]}
              onPress={() => refresh()}
            >
              <Text style={styles.textStyle}>Refresh</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.postsContainer}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostContainer
              key={item.id}
              name={item.author.name}
              profilePhoto={item.author.profilePic}
              timestamp={item.timestamp}
              caption={item.caption}
              imagePost={item.image}
              likes={item.likes}
              comments={item.comments}
              postId={item.id}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        {/* {posts ? posts.map(post => {
              return <PostContainer 
                  key={post.id}
                  name={post.author.name}
                  profilePhoto={post.author.profilePic}
                  timestamp={post.timestamp}
                  caption={post.caption}
                  imagePost={post.image}
                  likes={post.likes}
                  comments={post.comments}
              />
          }) : console.log("no data")} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
  },
  profile: {
    flex: 1,
    backgroundColor: "#A71E34",
    alignItems: "center",
    width: width,
    maxHeight: height / 2,
  },
  profilePic: {
    marginLeft: 10,
    marginRight: 10,
    height: width / 3,
    width: width / 3,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
  },
  bio: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  postsContainer: {
    maxHeight: height / 2,
    justifyContent: "flex-end",
    backgroundColor: "#A71E34",
  },
  postInteractions: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.9,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonSubmit: {
    backgroundColor: "blue",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.85,
    height: width * 0.25,
    padding: 8,
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileContainer;

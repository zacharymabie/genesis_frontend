import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

var { height, width } = Dimensions.get("window");

const ProgramCard = (props) => {
  const [programs, setPrograms] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("/Users/zachelliott/Desktop/Genesis/genesis_frontend/assets/favicon.png")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.description}>
        <Text style={styles.name}>PPL</Text>
        <Text style={styles.author}>By Zach</Text>
        <Text>Description of the program and how it functions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: (width * 7) / 8,
    height: height / 7,
    borderRadius: 15,
    borderWidth: 5,
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
    borderRightWidth: 5,
  },
  image: { flex: 1, width: "100%", height: "100%" },
  description: { flex: 2 },
  name: {
    fontSize: 30,
    padding: "2%",
  },
});

export default ProgramCard;

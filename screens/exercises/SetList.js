import React from "react";
import { View } from "react-native";
import SetCard from "./SetCard";

const SetList = (props) => {
  const { item, setNo, setSets, sets, appendFinal, finalSets } = props;
  return (
    <View>
      <SetCard
        appendFinal={appendFinal}
        sets={sets}
        setSets={setSets}
        setNo={setNo}
        item={item}
        finalSets={finalSets}
      />
    </View>
  );
};

export default SetList;

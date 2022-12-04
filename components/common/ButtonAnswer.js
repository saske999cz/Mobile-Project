import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function ButtonAnswer(props) {
  return (
    <TouchableOpacity style={styles.buttonAnswer} onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.textIndex}>{props.textIndex}:</Text>
        <Text style={styles.textMain}>{props.textMain}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ButtonAnswer;

const styles = StyleSheet.create({
  buttonAnswer: {
    backgroundColor: "black",
    height: "100%",
    width: "100%",
    borderWidth: "3px",
    borderColor: "#74a2d5",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  textIndex: {
    color: "yellow",
    fontSize: 18,
    fontWeight: "bold",
  },
  textMain: {
    marginLeft: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "medium",
  },
});

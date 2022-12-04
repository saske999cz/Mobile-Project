import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Button(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    height: 58,
    borderWidth: "3px",
    borderColor: "#74a2d5",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

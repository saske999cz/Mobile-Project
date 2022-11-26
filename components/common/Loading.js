import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StyleSheet } from "react-native";

function LoadingCircular(props) {
  return (
    <Spinner
      visible={props.visible}
      textContent={props.textContent ? props.textContent : "Đợi xíu..."}
      textStyle={styles.spinnerTextStyle}
    />
  );
}

export default LoadingCircular;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});

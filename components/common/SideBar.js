import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

let styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "75%",
    height: "100%",
    flex: 1,
    zIndex: 100,
    opacity: 0.9,
  },
});

export default Sidebar = (props) => {
  const leftAnim = useRef(new Animated.Value(-350)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(leftAnim, {
      toValue: 0,
      duration: 1000,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
    }).start();
  }, [leftAnim]);

  return (
    <Animated.View
      style={[styles.container, { left: leftAnim, opacity: opacityAnim }]}
    >
      {props.children}
    </Animated.View>
  );
};

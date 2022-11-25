import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button
        title="go to home screen"
        onPress={() => navigation.navigate(ROUTER.HOME)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

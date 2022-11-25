import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { ROUTER } from "../constants/route";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="go to login screen"
        onPress={() => navigation.navigate(ROUTER.LOGIN)}
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

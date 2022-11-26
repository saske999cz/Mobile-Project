import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ROUTER } from "../constants/route";

import { updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import { go } from "../utils/common";
import LoadingCircular from "../components/common/Loading";

export default function UpdateInfo({ navigation }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onHandleUpdateInfo = () => {
    setIsLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      phoneNumber,
    })
      .then(() => {
        go(navigation, ROUTER.LOGIN);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingCircular visible={isLoading} />}
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>ENTER YOUR INFORMATION</Text>
        <TextInput
          style={styles.input}
          placeholder="Bin Chilling..."
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="090xxxxx73"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="text"
          value={phoneNumber}
          maxLength={11}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleUpdateInfo}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            CONFIRM
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

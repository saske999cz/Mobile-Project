import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
} from "react-native";
import { ROUTER } from "../constants/route";
import { getCurrentUser, go } from "../utils/common";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import LoadingCircular from "../components/common/Loading";
export default function Home({ navigation }) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return go(navigation, ROUTER.LOGIN);
    setUser(user);
  }, []);

  const handleSignOut = () => {
    setIsLoading(true);
    return signOut(auth)
      .then(() => {
        go(navigation, ROUTER.LOGIN);
        Alert.alert("LOG OUT SUCCESSFULLY");
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
        setIsLoading(false);
      });
  };

  console.log(user);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingCircular visible={isLoading} />}
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>
          WELCOME {user?.displayName || ""} TO MY GAME
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => go(navigation, ROUTER.PLAY)}
        >
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Chơi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Gét Go
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Bảng Điểm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Log Out
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

import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LoadingCircular from "../components/common/Loading";
import { auth } from "../config/firebase";
import { ROUTER } from "../constants/route";
import { logout } from "../store/userStore";
import { go } from "../utils/common";
import homeBg from "../assets/homeBg.png";
import Button from "../components/common/Button";

export default function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((rootState) => rootState.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    setIsLoading(true);
    return signOut(auth)
      .then(() => {
        go(props.navigation, ROUTER.LOGIN);
        Alert.alert("ĐĂNG XUẤT THÀNH CÔNG");
        setIsLoading(false);
        dispatch(logout());
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!user || (user && Object.keys(user) === 0)) {
      go(props.navigation, ROUTER.LOGIN);
    }
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingCircular visible={isLoading} />}
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Image source={homeBg} style={styles.MainIMG} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => go(props.navigation, ROUTER.PLAY)}
        >
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Chơi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Bảng Điểm
          </Text>
        </TouchableOpacity>
        <Button onPress={handleSignOut} text="Đăng Xuất"></Button>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "slateblue",
  },
  MainIMG: {
    alignSelf: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "midnightblue",
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
    backgroundColor: "slateblue",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "midnightblue",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

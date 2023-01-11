import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
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
import LoadingCircular from "../components/common/Loading";
import { auth } from "../config/firebase";
import { ROUTER } from "../constants/route";
import { go } from "../utils/common";
import { useDispatch } from "react-redux";
import { login } from "../store/userStore";

export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          Alert.alert("Đăng nhập thành công");
          dispatch(
            login({
              user: {
                email: res.user.email,
                photoURL: res.user.photoURL,
                displayName: res.user.displayName,
              },
            })
          );
          setIsLoading(false);
          go(props.navigation, ROUTER.HOME);
        })
        .catch((err) => {
          Alert.alert("Lỗi đăng nhập", err.message);
          setIsLoading(false);
        });
    }
  };

  // useEffect(() => {
  //   if()
  //   // go(props.navigation, ROUTER.HOME);
  // }, [props]);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingCircular visible={isLoading} />}
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>HÃY ĐĂNG NHẬP ĐỂ BẮT ĐẦU CHƠI</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email..."
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu..."
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            ĐĂNG NHẬP
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Không có tài khoản?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => go(props.navigation, ROUTER.REGISTER)}
          >
            <Text style={{ color: "slateblue", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
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
    color: "slateblue",
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
    backgroundColor: "slateblue",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

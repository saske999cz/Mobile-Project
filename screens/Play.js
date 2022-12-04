import { SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonAnswer from "../components/common/ButtonAnswer";
import LoadingCircular from "../components/common/Loading";
import SideBar from "../components/common/SideBar";
import { db } from "../config/firebase";
import imagePlayScreenBg from "../assets/haha.jpg";
import { useTimer } from "../hooks/count-down";

export default function Play({ navigation }) {
  const [listAnswer, setListAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isStartCount, setIsStartCount] = useState(true);

  const timeLeft = useTimer(isStartCount);
  useEffect(() => {
    if (+timeLeft === 0) {
      setIsStartCount(false);
    }
  }, [timeLeft]);

  console.log({ timeLeft, isStartCount });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        if (querySnapshot) {
          const result = [];
          querySnapshot.forEach((doc) => result.push(doc.data()));
          setListAnswer(result);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingCircular visible={isLoading} />}

      <Image source={imagePlayScreenBg} style={styles.backgroundImage} />

      {isOpenMenu && (
        <SideBar>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text>hehe</Text>
          </View>
        </SideBar>
      )}

      {/* icon menu  */}
      <TouchableOpacity
        onPress={() => setIsOpenMenu((prev) => !prev)}
        style={{ position: "absolute", top: 15, right: 10, zIndex: 100 }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderRadius: "50%",
          }}
        >
          <SimpleLineIcons name="menu" size={18} color="midnightblue" />
        </View>
      </TouchableOpacity>

      {/* main view */}
      <View style={styles.whiteSheet} />

      {/* question */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{listAnswer[0]?.question || ""}</Text>
      </View>

      {/* countdown */}
      <View>
        {isStartCount ? (
          <View style={styles.textTimeLeftContainer}>
            <View
              style={{
                display: "flex",

                flexDirection: "col",
              }}
            >
              <Text style={styles.textTimeLeft}>
                Thời gian trả lời còn lại :
              </Text>

              <Text
                style={{
                  color: +timeLeft > 5 ? "white" : "red",
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {timeLeft}s
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.textTimeLeftContainer}>
            <Text style={styles.textTimeLeft}>
              Thời gian trả lời của bạn đã hết.
            </Text>
          </View>
        )}
      </View>

      {/* list answers */}
      <View style={styles.answerContainer}>
        {listAnswer &&
          listAnswer.length > 0 &&
          listAnswer[0]?.answers &&
          listAnswer[0]?.answers?.map((item, index) => (
            <View style={styles.answerBtn} key={index}>
              <ButtonAnswer textMain={item?.answer} textIndex={index + 1} />
            </View>
          ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "midnightblue",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: "white",
    alignSelf: "center",
    zIndex: 60,
    opacity: 0.2,
  },
  textTimeLeftContainer: {
    marginTop: 20,
    padding: 20,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textTimeLeft: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  questionContainer: {
    marginTop: 100,
    padding: 20,
    backgroundColor: "black",
    zIndex: 100,
    borderWidth: 4,
    borderColor: "#74a2d5",
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    display: "block",
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    paddingBottom: 24,
    textAlign: "center",
  },
  answerContainer: {
    paddingBottom: 50,
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: "row",
    flexWrap: "wrap",
    zIndex: 70,
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "slateblue",
    borderTopLeftRadius: 60,
    opacity: 0.5,
  },
  answerBtn: {
    height: 58,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 2 - 10,
    margin: 5,
  },
});

import { SimpleLineIcons } from "@expo/vector-icons";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import imagePlayScreenBg from "../assets/haha.jpg";
import ButtonAnswer from "../components/common/ButtonAnswer";
import LoadingCircular from "../components/common/Loading";
import SideBar from "../components/common/SideBar";
import PlaySidebarContent from "../components/molecules/PlaySidebarContent";
import { db } from "../config/firebase";
import { moneyByNumberQuestion } from "../constants/data";
import { ROUTER } from "../constants/route";
import { go, randomQuestion, formatVND } from "../utils/common";
import { useSelector } from "react-redux";

const defaultItemAnswer = {
  index: -1,
  color: "",
  type: "",
};
import help1 from "../assets/help1.png";
import help2 from "../assets/help2.png";
import help3 from "../assets/help3.png";

export default function Play({ navigation }) {
  const [count, setCount] = useState(60);
  const { user } = useSelector((rootState) => rootState.user);
  const [currentItemAnswer, setCurrentItemAnswer] = useState(defaultItemAnswer);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isStartCount, setIsStartCount] = useState(true);
  const [score, setScore] = useState({
    level: 1,
    number: 1,
  });

  useEffect(() => {
    if (isStartCount) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
      return () => clearInterval(secondsLeft);
    }
  }, [isStartCount]);

  function answerIndex(index) {
    if (index == 1) return "A";
    if (index == 2) return "B";
    if (index == 3) return "C";
    if (index == 4) return "D";
  }

  const onHandleGameProcess = async (type) => {
    try {
      setIsStartCount(false);
      await addDoc(collection(db, "scores"), {
        email: user?.email || "",
        money: getMoneyByNumberQuestion(score.number),
        numberQuestion: score.number,
      });

      if (type === "win") {
        Alert.alert(
          type === "win" ? "Chúc mừng bạnn" : "Bạn thua rùiii",
          type === "win"
            ? `Bạn đã kết thúc lượt chơi của mình với tất cả các câu hỏi , số tiền thưởng bạn đạt được ${formatVND(
                getMoneyByNumberQuestion(score.number)
              )} cho lần chơi này. Congratulations`
            : `Bạn đã kết thúc lượt chơi của mình tại câu hỏi số ${
                score.number
              }, và số tiền thưởng bạn đạt được là ${formatVND(
                getMoneyByNumberQuestion(score.number)
              )} , chúc bạn may mắn trong lượt chơi kế tiếp.`,

          [
            {
              text: "Okê",
              onPress: () => go(navigation, ROUTER.HOME),
            },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      }
      setTimeout(() => go(navigation, ROUTER.HOME), 4000);
    } catch (error) {
      console.log({ error });
    }
  };

  const getLevel = (index) => {
    if (index >= 1 && index <= 4) return 1;
    if (index >= 5 && index <= 9) return 2;
    if (index >= 10 && index <= 14) return 3;
    if (index === 15) return 4;
    return 1;
  };

  const getMoneyByNumberQuestion = (questionNumber) => {
    if (questionNumber >= 1) {
      return moneyByNumberQuestion.find((item) => item.index === questionNumber)
        .money;
    }
    return 0;
  };
  const handleAnswerQuestion = (item, index, level) => {
    if (item.isCorrect) {
      if (score.number === 14) return onHandleGameProcess("win");

      setCurrentItemAnswer({
        index,
        color: "green",
        type: "success",
      });
      setIsStartCount(false);

      setTimeout(() => {
        setScore((prev) => ({
          ...prev,
          level: level,
          number: prev.number + 1,
        }));
        const filterData = data.filter((currentItem) => {
          return currentItem.id !== currentQuestion.id;
        });
        setData(filterData);
        setCurrentItemAnswer(defaultItemAnswer);
        setCount(60);
        setIsStartCount(true);
      }, 1500);
    } else {
      setCurrentItemAnswer({
        index,
        color: "red",
        type: "error",
      });
      onHandleGameProcess("lose");
    }
  };

  useEffect(() => {
    if (count === 0) onHandleGameProcess("lose");
  }, [count]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const randomItem = randomQuestion(data, getLevel(score.number));
    setCurrentQuestion(randomItem);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        if (querySnapshot) {
          const result = [];
          querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
          });
          setData(result);
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
          <PlaySidebarContent currentQuestion={score.number} />
        </SideBar>
      )}

      {/* icon menu  */}
      <TouchableOpacity
        onPress={() => setIsOpenMenu((prev) => !prev)}
        style={{ position: "absolute", top: 30, right: 10, zIndex: 100 }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderRadius: 50,
          }}
        >
          <SimpleLineIcons name="menu" size={18} color="midnightblue" />
        </View>
      </TouchableOpacity>

      {/* main view */}
      <View style={styles.whiteSheet} />

      {/* question */}
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{currentQuestion?.question || ""}</Text>
      </View>

      <View style={styles.helpcontainer}>
        <TouchableOpacity>
          <Image source={help1} style={styles.HelpIMG} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={help2} style={styles.HelpIMGv1} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={help3} style={styles.HelpIMGv2} />
        </TouchableOpacity>
      </View>

      {/* countdown */}
      <View style={styles.clock}>
        {isStartCount ? (
          <View style={styles.textTimeLeftContainer}>
            <View
              style={{
                display: "flex",

                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  color: count > 5 ? "white" : "orange",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 3,
                }}
              >
                {count}s
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.textTimeLeftContainer}>
            <Text style={styles.textTimeLeft}>Hết giờ</Text>
          </View>
        )}
      </View>

      {/* list answers */}
      <View style={styles.answerContainer}>
        {currentQuestion &&
          currentQuestion?.answers?.length > 0 &&
          currentQuestion?.answers &&
          currentQuestion?.answers?.map((item, index) => (
            <View style={styles.answerBtn} key={index}>
              <ButtonAnswer
                textMain={item?.answer}
                textIndex={answerIndex(index + 1)}
                style={{
                  backgroundColor:
                    currentItemAnswer.index === index
                      ? currentItemAnswer.color
                      : "black",
                }}
                onPress={() => {
                  handleAnswerQuestion(item, index, getLevel(score.number));
                }}
              />
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
    padding: 20,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textTimeLeft: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
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
    display: "flex",
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
    flexDirection: "column",
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
    width: Dimensions.get("window").width - 20,
    margin: 5,
  },
  clock: {
    position: "absolute",
    backgroundColor: "black",
    borderWidth: 3,
    borderRadius: 100,
    borderColor: "#74a2d5",
    width: 80,
    height: 80,
    zIndex: 110,
    marginTop: 8,
    marginLeft: 10,
  },

  helpcontainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    zIndex: 100,
    position: "absolute",
    top: 255,
  },

  HelpIMG: {
    height: 120,
    width: 120,
    marginLeft: 7,
  },
  HelpIMGv1: {
    height: 130,
    width: 130,
  },
  HelpIMGv2: {
    height: 135,
    width: 135,
  },
});

import { SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
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
import ButtonAnswer from "../components/common/ButtonAnswer";
import LoadingCircular from "../components/common/Loading";
import SideBar from "../components/common/SideBar";
import { db } from "../config/firebase";
import imagePlayScreenBg from "../assets/haha.jpg";
import { useTimer } from "../hooks/count-down";
import PlaySidebarContent from "../components/molecules/PlaySidebarContent";
import { useSelector } from "react-redux";
import { formatVND } from "../utils/common";
import haha from "../assets/haha.jpg";

export default function Play({ navigation }) {
  const [listAnswer, setListAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isStartCount, setIsStartCount] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const { user } = useSelector((rootState) => rootState.user);
  const [userBoard, setUserBoard] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "scores"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot) {
          const result = [];
          let count = 0;
          let item ={};
          querySnapshot.forEach((doc) => {
            if(doc.data().numberQuestion > count) {
                count=doc.data().numberQuestion; 
                item =doc.data()}});
          setUserBoard(item);
          console.log(item);
          
          
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
    <View style ={styles.container}>
    <Image source={haha} style={styles.backgroundImage} />
        <Text style={styles.title}>
            THỐNG KÊ
        </Text>
        <View style={styles.infocontainer}> 
        <Text style={styles.scoretext}>
            Tên:  {user.email}
        </Text>
        <Text style={styles.scoretext}>
            Số tiền nhiều nhất:  {formatVND(userBoard.money)} 
        </Text>
        <Text style={styles.scoretext}>
            Số câu trả lời đúng:  {userBoard.numberQuestion}
        </Text>
        </View>
        
    </View>
  )
  }
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "slateblue",
    alignItems:'center',
    display:'flex',
    
  },
  infocontainer:{
    marginTop: 10,
    backgroundColor: "black",
    alignItems:'flex-start',
    display:'flex',
    flexDirection:'column',
    height: 600,
    width: Dimensions.get("window").width - 50,
    borderRadius:40,
    borderWidth:2,
    borderColor:"#74a2d5",
    zIndex:100,
  },
  scoretext: {
    fontSize:20,
    fontWeight:'500',
    color:'white',
    marginTop:70,
    marginLeft:20,
    
  },
title:{
    fontSize:40,
    fontWeight:'700',
    color:'#FF7000',
    marginTop:10,
    zIndex:150,
    
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
  
});

import { SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
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

export default function Play({ navigation }) {
  const [listAnswer, setListAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isStartCount, setIsStartCount] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);



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
    <View style ={styles.container}>
        <Text style={styles.title}>
            THỐNG KÊ
        </Text>
        <View style={styles.infocontainer}> 
        <Text style={styles.scoretext}>
            User:
        </Text>
        <Text style={styles.scoretext}>
            Max Score:
        </Text>
        <Text style={styles.scoretext}>
            Tổng số câu đã trả lời:
        </Text>
        <Text style={styles.scoretext}>
            Số câu trả lời đúng:
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
    backgroundColor: "midnightblue",
    alignItems:'flex-start',
    display:'flex',
    flexDirection:'column',
    height: 600,
    width: Dimensions.get("window").width - 50,
    borderRadius:40,
    borderWidth:2,
    borderColor:"#74a2d5",
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
    
  }
  
});

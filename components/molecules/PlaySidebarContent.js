import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { formatVND } from "../../utils/common";
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

const data = [
  {
    index: "01",
    money: 100000,
  },
  {
    index: "02",
    money: 200000,
  },
  {
    index: "03",
    money: 300000,
  },
  {
    index: "04",
    money: 500000,
  },
  {
    index: "05",
    money: 1000000,
  },
  {
    index: "06",
    money: 2000000,
  },
  {
    index: "07",
    money: 4000000,
  },
  {
    index: "08",
    money: 8000000,
  },
  {
    index: "09",
    money: 16000000,
  },
  {
    index: "10",
    money: 32000000,
  },
  {
    index: "11",
    money: 64000000,
  },
  {
    index: "12",
    money: 125000000,
  },
  {
    index: "13",
    money: 250000000,
  },
  {
    index: "14",
    money: 500000000,
  },
  {
    index: "15",
    money: 1000000000,
  },
];

function PlaySidebarContent(props) {
  const [active, setActive] = useState(props?.currentQuestion || 1);

  const renderItem = (obj) => {
    const item = obj.item;
    const isHighlight =
      +item.index === 5 || +item.index === 10 || +item.index === 15
        ? true
        : false;
    return (
      <View style={styles.row}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 35,
            height: 35,
            borderRadius: 1000,
            backgroundColor: isHighlight ? "#ff4949" : "transparent",
          }}
        >
          <Text
            style={{
              color: isHighlight ? "white" : "white",
              fontSize: isHighlight ? 24 : 20,
              textAlign: "center",
            }}
          >
            {item?.index}
          </Text>
        </View>

        <Text
          style={{
            color: isHighlight ? "#ff0000" : "white",
            fontSize: isHighlight ? 26 : 22,
            marginLeft: isHighlight ? 15 : 30,
          }}
        >
          {formatVND(item?.money)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={[
          "rgba(118,190,255,0.95)",
          "rgba(161,168,255,0.95)",
          "rgba(200,233,255,0.95)",
        ]}
        style={styles.background}
      >
        <View style={styles.main}>
          <Text style={styles.bonusTitle}>Mốc Tiền Thưởng</Text>
          <View
            style={{ marginTop: 20, display: "flex", flexDirection: "column" }}
          >
            <FlatList data={data.reverse()} renderItem={renderItem} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  background: {
    flex: 1,
  },
  main: {
    padding: 20,
  },
  bonusTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 2,
    alignItems: "center",
  },
});

export default React.memo(PlaySidebarContent);

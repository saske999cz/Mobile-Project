import { auth } from "../config/firebase";
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
const convertNumber = (value) => {
  return +value;
};

const go = (navigation, path, option = {}) => {
  navigation.navigate(path, { ...option });
};

const formatVND = (money) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
};

const randomQuestion = (listData = [], level) => {
  if (!listData || listData.length === 0) return {};
  const listQuestionSameLevel =
    listData && listData?.filter((item) => +item.level === +level);
  const randomIndex = Math.floor(Math.random() * listQuestionSameLevel.length);
  return listQuestionSameLevel[randomIndex];
};

export { convertNumber, go, formatVND, randomQuestion };

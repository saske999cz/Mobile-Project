import { auth } from "../config/firebase";

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

export { convertNumber, go, formatVND };

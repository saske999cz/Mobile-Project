import { auth } from "../config/firebase";

const convertNumber = (value) => {
  return +value;
};

const go = (navigation, path, option = {}) => {
  navigation.navigate(path, { ...option });
};

export { convertNumber, go };

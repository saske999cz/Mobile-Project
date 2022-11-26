import { auth } from "../config/firebase";

const convertNumber = (value) => {
  return +value;
};

const go = (navigation, path, option = {}) => {
  navigation.navigate(path, { ...option });
};

const getCurrentUser = () => {
  const user = auth.currentUser;
  return user ? user : undefined;
};
export { convertNumber, go, getCurrentUser };

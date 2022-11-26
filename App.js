import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { ROUTER } from "./constants/route";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import UpdateInfo from "./screens/UpdateInfo";
import Play from "./screens/Play";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ROUTER.HOME} component={Home} />
        <Stack.Screen name={ROUTER.LOGIN} component={Login} />
        <Stack.Screen name={ROUTER.REGISTER} component={Register} />
        <Stack.Screen name={ROUTER.UPDATE_INFO} component={UpdateInfo} />
        <Stack.Screen name={ROUTER.PLAY} component={Play} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

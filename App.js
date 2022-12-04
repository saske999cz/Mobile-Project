import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { ROUTER } from "./constants/route";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Play from "./screens/Play";
import Register from "./screens/Register";
import UpdateInfo from "./screens/UpdateInfo";
import Score from "./screens/Score";
import { rootStore } from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={rootStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={ROUTER.LOGIN} component={Login} />
          <Stack.Screen name={ROUTER.HOME} component={Home} />
          <Stack.Screen name={ROUTER.SCORE} component={Score} />
          <Stack.Screen name={ROUTER.REGISTER} component={Register} />
          <Stack.Screen name={ROUTER.UPDATE_INFO} component={UpdateInfo} />
          <Stack.Screen name={ROUTER.PLAY} component={Play} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

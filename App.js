import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { ROUTER } from "./constants/route";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ROUTER.HOME} component={Home} />
      </Stack.Navigator>
      <Stack.Navigator>
        <Stack.Screen name={ROUTER.LOGIN} component={Login} />
      </Stack.Navigator>
      <Stack.Navigator>
        <Stack.Screen name={ROUTER.REGISTER} component={Register} />
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

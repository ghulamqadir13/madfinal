
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./Screens/WelcomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/signUpScreen";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

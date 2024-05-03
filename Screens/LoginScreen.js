import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";


function LoginScreen({ navigation }) {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const signUp = () => {
    navigation.navigate("Signup");
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  }

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  const validate = async () => {
    let isValid = true;

    if (!inputs.email) {
      handleError("Please enter a email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please enter a valid email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please enter a password", "password");
      isValid = false;
    } else if (inputs.password.length < 6) {
      handleError("Password must be at least 6 characters", "password");
      isValid = false;
    }

    if (isValid) {
      handleSignIn();
    } else if (!isValid) {
      console.log("Invalid");
    }
  }

  const handleSignIn = () => {
    console.log("Login: ");
    console.log(inputs);

    setLoading(true);
    setTimeout(async () => {
      try {
        setLoading(false);
        let userData = await AsyncStorage.getItem("userData");

        if (userData) {
          userData = JSON.parse(userData);
          console.log("userData: ", userData);

          if (userData.email === inputs.email && userData.password === inputs.password) {
            navigation.navigate("Home");
            console.log("User found");
            AsyncStorage.setItem("isLoggedIn", JSON.stringify({...userData, isLoggedIn: true}));
          } else {
            console.log("Invalid email or password");
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Error',
              textBody: "Invalid email or password",
              button: 'close',
            })
          }
        } else {
          console.log("User not found");
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: "User not found",
            button: 'close',
          })
        }
      } catch (error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: error,
          button: 'close',
        })
      }
    }, 3000);
  };

  return (
    <AlertNotificationRoot style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Welcome Back</Text>
          <Text style={styles.Subtitle}>Enter your credentials</Text>
        </View>

        <Loader visible={loading} />

        <View style={styles.inputContainer}>
          <Input
            label="Email Address"
            iconName="envelope"
            placeholder="Email Address"
            onChangeText={text => handleOnChange(text, "email")}
            onFocus={() => handleError(null, "email")}
            error={errors.email}
          />
          <Input label="Password"
            iconName="lock"
            placeholder="Password"
            onChangeText={text => handleOnChange(text, "password")}
            onFocus={() => handleError(null, "password")}
            error={errors.password}
            password
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={validate} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={signUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingTop: 10,
  },
  Subtitle: {
    fontSize: 15,
    color: "black",
    marginTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    width: "100%",
    alignSelf: "center",
    paddingRight: 10,
    paddingLeft: 10,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 40,
    alignSelf: "center",
  },
  signupText: {
    marginRight: 20,
    color: "black",
    fontSize: 15,
  },
  signupButtonText: {
    width: "100%",
    color: "purple",
    fontSize: 15,
  },
});

export default LoginScreen;
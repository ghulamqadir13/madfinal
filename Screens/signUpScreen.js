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
  Keyboard,
  SafeAreaView,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import Input from "../Components/Input";
import Loader from "../Components/Loader";
const SignUpScreen = () => {
  // const [text, onChangeText] = React.useState('');
  // const [number, onChangeNumber] = React.useState('');

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const signIn = () => {
    navigation.navigate("Login");
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  }

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  }

  const validate = () => {
    let isValid = true;

    if (!inputs.name) {
      handleError("Please enter a name", "name");
      isValid = false;
    }

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

    if (!inputs.confirmPassword) {
      handleError("Please confirm your password", "confirmPassword");
      isValid = false;
    } else if (inputs.password !== inputs.confirmPassword) {
      handleError("Password do not match", "confirmPassword");
      isValid = false;
    }

    if (isValid) {
      handleSignUp();
    } else if (!isValid) {
      console.log("Invalid");
    }
  }

  const handleSignUp = () => {
    console.log("Register: ");
    console.log(inputs);


    setLoading(true);
    setTimeout(() => {
      try {
        AsyncStorage.setItem("userData", JSON.stringify(inputs));
        setLoading(false);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Successfully registered',
          button: 'close',
        })
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
    <SafeAreaView style={styles.container}>
      <AlertNotificationRoot>
        <View style={styles.header}>
          <Text style={styles.Title}>Sign Up</Text>
          <Text style={styles.Subtitle}>Create your account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            label="User Name"
            iconName="user"
            placeholder="Full Name"
            onChangeText={text => handleOnChange(text, "name")}
            onFocus={() => handleError(null, "name")}
            error={errors.name}
          />
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
          <Input label="Confirm Password"
            iconName="lock"
            placeholder="Confirm Password"
            onChangeText={text => handleOnChange(text, "confirmPassword")}
            onFocus={() => handleError(null, "confirmPassword")}
            error={errors.confirmPassword}
            password
          />
        </View>
        <Loader visible={loading} />
        <TouchableOpacity style={styles.signupButton} onPress={validate} activeOpacity={0.8}>
          <Text style={styles.signupButtonText} >Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={signIn}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </AlertNotificationRoot>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
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
  signupButton: {
    width: "80%",
    backgroundColor: "purple",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 20,
  },
  signupButtonText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
  },
  loginText: {
    marginRight: 20,
    color: "black",
    fontSize: 15,
  },
  loginButtonText: {
    width: "100%",
    color: "purple",
    fontSize: 15,
  },
});

export default SignUpScreen;
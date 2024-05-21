import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from './Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
      const user = userCredential.user;
      console.log('User Login', user.email);
    } catch (error) {
      const errorMessage = error.message;
      console.log('Error', errorMessage);
      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.Title}>Welcome Back</Text>
          <Text style={styles.Subtitle}>Enter your credentials</Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Email Address"
            iconName="envelope"
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            iconName="lock"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
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
    paddingHorizontal: 10,
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

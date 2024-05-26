import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"; // Ensure you have these icons installed
import Input from "../Components/Input";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

const LoginScreen = ({ navigation }) => {
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
    <ImageBackground source={require("../assets/HadithBg.jpg")} style={styles.backgroundImage}>
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
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.fbButton]}>
            <FontAwesome5 name="facebook-f" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <FontAwesome5 name="google" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity style={styles.signupButton} onPress={signUp}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
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
    color: "white",
    paddingTop: 10,
  },
  Subtitle: {
    fontSize: 15,
    color: "white",
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
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  fbButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#DB4437",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 40,
    alignSelf: "center",
  },
  signupText: {
    marginRight: 20,
    color: "white",
    fontSize: 15,
  },
  signupButtonText: {
    width: "100%",
    color: "#6A5ACD",
    fontSize: 15,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'white',
    fontSize: 14,
  },
});

export default LoginScreen;

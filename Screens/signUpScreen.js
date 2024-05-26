import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import Input from "../Components/Input";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import necessary functions from Firebase

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = getAuth(); // Initialize auth

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User Created', user);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Successfully registered',
        button: 'close',
      })
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: errorMessage, // Use errorMessage here
        button: 'close',
      })
      console.log('Error', errorCode, errorMessage);
      // Alert.alert("Signup Error", errorMessage); // Show error message to the user
    }
  }

  return (
    <ImageBackground source={require("../assets/HadithBg.jpg")} style={styles.backgroundImage}>
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
              value={userName}
              onChangeText={setuserName}
              autoCapitalize="none"
            />
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
            <Input
              label="Confirm Password"
              iconName="lock"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup} activeOpacity={0.8}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
          <View style={styles.socialContainer}>
            <TouchableOpacity style={[styles.socialButton, styles.fbButton]}>
              <FontAwesome5 name="facebook-f" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
              <FontAwesome5 name="google" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </AlertNotificationRoot>
      </SafeAreaView>
    </ImageBackground>
  );
}

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
  signupButton: {
    width: "80%",
    backgroundColor: "#6A5ACD",
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
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
  },
  loginText: {
    marginRight: 20,
    color: "white",
    fontSize: 15,
  },
  loginButtonText: {
    width: "100%",
    color: "#6A5ACD",
    fontSize: 15,
  },
});

export default SignupScreen;

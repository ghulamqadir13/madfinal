import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


const HomeScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();

  React.useEffect(() => {
    getUserData();
  }, [])

  const logout = () => {
    navigation.navigate('Login')
  }
  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      console.log("Home")
      console.log(userData)
      setUserDetails(JSON.parse(userData))
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {userDetails.name} </Text>
      <TouchableOpacity style={styles.signupButton} onPress={logout} activeOpacity={0.8}>
          <Text style={styles.signupButtonText} >Logout</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: 'black'
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
})
export default HomeScreen
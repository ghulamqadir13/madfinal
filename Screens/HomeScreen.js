import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
// import { ScrollView } from "react-native-gesture-handler";
import TimingScreen from "./MovieList";

function HomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState();

  React.useEffect(() => {
    getUserData();
  }, []);

  // const logout = () => {
  //   navigation.navigate('Login')
  // }

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      console.log("Home");
      console.log(userData);
      setUserDetails(JSON.parse(userData));
    }
  };
  return (
    
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoImage}>
            <Image
              source={require("../assets/logoHome.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.drawer}
              onPress={() => navigation.openDrawer()}
              activeOpacity={0.8}
            >
              <Entypo name="menu" size={35} color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1,backgroundColor:'gray'}}>
          <View style={styles.timerContainer}>
          <TimingScreen />
          </View>
          
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.JHContainer}>
          {/* <View style={styles.JuzzContainer}>
            <Text></Text>
          </View>
          <View style={styles.HadithContainer}>
            <Text>Hadiths</Text>
          </View> */}
          <View>
            <Text>Hadith of the Day</Text>
          </View>
        </View>
        <View style={styles.TafseerTranslationContainer}>
          <View style={styles.TafseerContainer}>
            <Text>Umrah Guidance</Text>
          </View>
          <View style={styles.TranslationContainer}>
            <Text>Hajj Guidance</Text>
          </View>
        </View>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  logoContainer: {
    flex: 0.7,
    flexDirection: "row",
    backgroundColor: "green",
    marginTop: "8%",
  },
  timerContainer: {
    flex: 1,
    // backgroundColor: "gray",
    borderRadius: 20,
    marginTop: "-6%",
    // marginLeft: "2%",
    // marginRight: "2%",
    borderWidth: 2, // Add border width
    borderColor: "black", // Add border color
    borderRadius: 10, // Add border radius
  },
  // savedContainer: {
  //   flex: 0.75,
  //   backgroundColor: "yellow",
  //   borderRadius: 20,
  //   marginTop: "7%",
  //   marginLeft: "7%",
  //   marginRight: "7%",
  //   marginBottom: "2%",
  //   borderWidth: 2, // Add border width
  //   borderColor: "black", // Add border color
  //   borderRadius: 10, // Add border radius
  // },
  logoImage: {
    flex: 3,
  },
  menuContainer: {
    flex: 1,
    marginTop: "9%",
  },
  logo: {
    width: "40%",
    height: "65%",
    borderRadius: 50,
    marginLeft: "5%",
    marginTop: "6%",
  },
  menuButton: {
    padding: "10%",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 5,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "green",
  },
  JHContainer: {
    flex: 1,
    backgroundColor: "pink",
    flexDirection: "row",
  },
  JuzzContainer: {
    flex: 1,
    backgroundColor: "tomato",
    marginHorizontal: "3%",
    marginVertical: "8%",
    borderWidth: 2, // Add border width
    borderColor: "black", // Add border color
    borderRadius: 10, // Add border radius
  },
  HadithContainer: {
    flex: 1,
    backgroundColor: "gray",
    marginHorizontal: "3%",
    marginVertical: "8%",
    borderWidth: 2, // Add border width
    borderColor: "black", // Add border color
    borderRadius: 10, // Add border radius
  },
  TafseerTranslationContainer: {
    flex: 1,
    backgroundColor: "green",
    flexDirection: "row",
  },
  TafseerContainer: {
    flex: 1,
    backgroundColor: "pink",
    marginHorizontal: "3%",
    marginVertical: "8%",
    borderWidth: 2, // Add border width
    borderColor: "black", // Add border color
    borderRadius: 10, // Add border radius
  },
  TranslationContainer: {
    flex: 1,
    backgroundColor: "yellow",
    marginHorizontal: "3%",
    marginVertical: "8%",
    borderWidth: 2, // Add border width
    borderColor: "black", // Add border color
    borderRadius: 10, // Add border radius
  },
  drawer: {
    position: "relative",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
    marginLeft: "45%",
    marginTop: "-12%",
  },
  icon: {
    position: "absolute",
    left: 0,
  },
});

export default HomeScreen;
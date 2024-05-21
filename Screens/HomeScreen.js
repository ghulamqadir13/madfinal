import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
// import { ScrollView } from "react-native-gesture-handler";
import TimingScreen from "./MovieList";
import HadithDisplay from "./HadithShow";

// import { ScrollView } from "react-native-gesture-handler";

function HomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState();

  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      // console.log("Home");
      // console.log(userData);
      setUserDetails(JSON.parse(userData));
    }
  };
  const onPressHajj = () => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate('HajjScreen');
  };
  const onPressUmrah = () => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate('UmrahScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
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
        <View style={{ flex: 1, backgroundColor: "gray" }}>
          <View style={styles.timerContainer}>
            <TimingScreen />
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.JHContainer}>
          <ScrollView style={styles.HadithDisplayContainer}>
            <HadithDisplay />
          </ScrollView>
        </View>
        <View style={styles.TafseerTranslationContainer}>
          <View style={styles.TafseerContainer}>
          <TouchableOpacity onPress={() => onPressUmrah()}>
          <Text>Umrah Guidance</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.TranslationContainer}>
            <TouchableOpacity onPress={() => onPressHajj()}>
              <Text>Hajj Guidance</Text>
            </TouchableOpacity>
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
    flex: .8,
    backgroundColor: "red",
  },
  logoContainer: {
    flex: 0.7,
    flexDirection: "row",
    backgroundColor: "#013220",
    marginTop: "8%",
  },
  timerContainer: {
    flex: 1,
    // backgroundColor: "gray",
    borderTopEndRadius: 45,
    borderTopStartRadius: 45,
    marginTop: "-16%",
    
    borderWidth: 5, // Add border width
    borderColor: "#fff", // Add border color
    // borderRadius: 50, // Add border radius
  },
  
  logoImage: {
    flex: 2,
  },
  menuContainer: {
    flex: 1,
    marginTop: "9%",
  },
  logo: {
    width: "25%",
    height: "55%",
    borderRadius: 50,
    marginLeft: "12%",
    marginTop: "4%",
  },
  menuButton: {
    padding: "10%",
    backgroundColor: "#007bff",
    color: "#D3D3D3",
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
  HadithDisplayContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    marginHorizontal: "2%",
    marginVertical: "3%",
    borderWidth: 1, // Add border width
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

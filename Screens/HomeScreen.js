import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import TimingScreen from "./StackNavigation/prayerTiming";
import HadithDisplay from "./StackNavigation/HadithShow";

function HomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const onPressHajj = () => {
    navigation.navigate("HajjScreen");
  };

  const onPressUmrah = () => {
    navigation.navigate("UmrahScreen");
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
        <View style={{ flex: 1, }}>
          <View style={styles.timerContainer}>
            <TimingScreen />
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.JHContainer}>
        <ImageBackground
            source={require("../assets/HadithBg.jpg")}
            style={styles.HadithDisplayContainer}
            blurRadius={4} // Add blur effect here
          >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <HadithDisplay />
            </ScrollView>
          </ImageBackground>
        </View>
        <View style={styles.Gems}>
          <TouchableOpacity onPress={() => onPressUmrah()}>
            <Text>Islamic Gems</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.UmrahHajjContainer}>
          <View style={styles.UmrahContainer}>
            <TouchableOpacity onPress={onPressUmrah}>
              <Image
                source={require("../assets/umrahLogo.jpg")}
                style={styles.guidanceLogo}
              />
              <Text>Umrah Guidance</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.HajjContainer}>
            <TouchableOpacity onPress={onPressHajj}>
              <Image
                source={require("../assets/hajjLogo.jpg")}
                style={styles.guidanceLogo}
              />
              <Text>Hajj Guidance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
  topContainer: {
    flex: 0.8,
  },
  logoContainer: {
    flex: 0.7,
    flexDirection: "row",
    backgroundColor: "purple",
    marginTop: "8%",
  },
  timerContainer: {
    flex: 1,
    borderTopEndRadius: 45,
    borderTopStartRadius: 45,
    marginTop: "-16%",
    borderWidth: 5,
    borderColor: "#fff",
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
    backgroundColor: "purple",
  },
  JHContainer: {
    flex: 0.8,
    marginTop: "-3%",
    flexDirection: "row",
  },
  UmrahHajjContainer: {
    flex: 0.8,
    marginTop: "-6%",
    backgroundColor: "purple",
    flexDirection: "row",
  },
  UmrahContainer: {
    flex: 1,
    backgroundColor: "#DDDDDD",
    marginHorizontal: "3%",
    marginVertical: "8%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  HajjContainer: {
    flex: 1,
    backgroundColor: "#DDDDDD",
    marginHorizontal: "3%",
    marginVertical: "8%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  guidanceLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  HadithDisplayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    resizeMode: "cover",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Gems: {
    flex: 0.2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "3%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    marginBottom: "7%",
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
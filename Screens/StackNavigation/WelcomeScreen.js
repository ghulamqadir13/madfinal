import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitleText}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</Text>
        </View>
        <View style={styles.Imagecontainer}>
          <Image style={styles.tinyLogo} source={require("../../assets/logo/lmage1.png")} />
        </View>
      </View>
      <View style={styles.Bottom}>
        <View style={styles.TitleContainer}>
          <TouchableOpacity style={styles.TitleTouchable}>
            <Text style={styles.Titletext}>Quranic Wisdoms</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Hadithcontainer}>
          <TouchableOpacity style={styles.HadithTouchable}>
            <Text style={styles.Hadithtext}>
              تم سب میں بہتر وہ ہے جو قرآن مجید پڑھے اور پڑھائے۔{"\n"}
              صحیح بخاری جلد۶ ۵۰۲۸
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.HadithTouchable}>
            <Text style={styles.Hadithtext}>
              عام لوگوں کے لئے تو یہ ( قرآن ) بیان ہے اور پرہیزگاروں{"\n"} کے لئے
              ہدایت اور نصیحت ہے ۔
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Buttoncontainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#4B0082",
  },
  Top: {
    flex: 1,
    backgroundColor: "purple",
  },
  Bottom: {
    flex: 1,
    backgroundColor: "purple",
  },
  headerTitleContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
  },
  Imagecontainer: {
    flex: 0.8,
  },
  tinyLogo: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  TitleContainer: {
    flex: 0.2,
    marginTop: 20,
    alignItems: "center",
  },
  TitleTouchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#6A5ACD",
    borderWidth: 1,
    borderColor: "black",
  },
  Titletext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  Hadithcontainer: {
    flex: 0.56,
    alignItems: "center",
  },
  HadithTouchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#6A5ACD",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  Hadithtext: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6A5ACD",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  Buttoncontainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
  },
});

export default WelcomeScreen;

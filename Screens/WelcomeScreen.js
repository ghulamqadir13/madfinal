import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const onPressNavigation = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitleText}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</Text>
      </View>
      <View style={styles.Imagecontainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/logo/lmage1.jpeg")}
        />
      </View>
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
        <TouchableOpacity style={styles.button} onPress={onPressNavigation}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0B0B0",
  },
  headerTitleContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  headerTitleText: {
    fontSize: 30, // Adjust the font size if needed
    fontWeight: 'bold',
    color: '#000000',
  },
  Imagecontainer: {
    flex: 0.4,
  },
  tinyLogo: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  TitleContainer: {
    flex: 0.07,
    marginTop: 20,
    alignItems: "center",
  },
  TitleTouchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    borderWidth: 1,
    borderColor: "black",
  },
  Titletext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Hadithcontainer: {
    flex: 0.3,
    alignItems: "center",
  },
  HadithTouchable: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#DDDDDD",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  Hadithtext: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  Buttoncontainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});
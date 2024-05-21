import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Ibadat = ({ navigation }) => {
  const onPressPrayers = () => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate("PrayersScreen");
  };
  const onPressFasting = () => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate("FastingScreen");
  };
  const onPressNamazaJanaza = () => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate("NamazJanazaDuaScreen");
  };
  
  const onPressHajjDua = () => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate("HajjDuaScreen");
  };
  const onPressUmrahDua = () => {
    // Navigate to a new screen passing the edition name as a parameter
    navigation.navigate("UmrahDuaScreen");
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ibadat</Text>
      <TouchableOpacity onPress={onPressPrayers} style={styles.button}>
        <Text style={styles.buttonText}>Prayers Guidance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressFasting} style={styles.button}>
        <Text style={styles.buttonText}>Fasting Guidance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressNamazaJanaza} style={styles.button}>
        <Text style={styles.buttonText}>Namaz e Janaza Guidance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressHajjDua} style={styles.button}>
        <Text style={styles.buttonText}>Hajj Dus's</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressUmrahDua} style={styles.button}>
        <Text style={styles.buttonText}>Umrah Dus's</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Ibadat;

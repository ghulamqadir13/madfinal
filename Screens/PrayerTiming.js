import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import MovieList from "./MovieList";
const PrayerTimingsScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
    <View style={{ flex: 0.35,}}>
      <MovieList />
    </View>  
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  
});

export default PrayerTimingsScreen;

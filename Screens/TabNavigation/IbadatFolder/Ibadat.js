import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Ibadat = ({ navigation }) => {
  const onPressPrayers = () => {
    navigation.navigate("PrayersScreen");
  };
  const onPressFasting = () => {
    navigation.navigate("FastingScreen");
  };
  const onPressNamazaJanaza = () => {
    navigation.navigate("NamazJanazaDuaScreen");
  };
  const onPressHajjDua = () => {
    navigation.navigate("HajjDuaScreen");
  };
  const onPressUmrahDua = () => {
    navigation.navigate("UmrahDuaScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ibadat</Text>
        <Text style={styles.headerDescription}>Explore various guides for prayers, fasting, and more.</Text>
      </View>
      <Swiper style={styles.wrapper} autoplay showsPagination={false}>
        <View style={styles.slide}>
          <Text style={styles.slideText}>Prayers Guidance</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.slideText}>Fasting Guidance</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.slideText}>Namaz e Janaza Guidance</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.slideText}>Hajj Dua's</Text>
        </View>
        <View style={styles.slide}>
          <Text style={styles.slideText}>Umrah Dua's</Text>
        </View>
      </Swiper>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <TouchableOpacity onPress={onPressPrayers} style={styles.button}>
          <FontAwesome5 name="pray" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Prayers Guidance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressFasting} style={styles.button}>
          <Icon name="cutlery" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Fasting Guidance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressNamazaJanaza} style={styles.button}>
          <Icon name="users" size={20} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Namaz e Janaza Guidance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressHajjDua} style={styles.button}>
          <FontAwesome5 name="kaaba" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Hajj Dua's</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressUmrahDua} style={styles.button}>
          <FontAwesome6 name="kaaba" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Umrah Dua's</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
  header: {
    padding: 20,
    backgroundColor: "purple",
    borderBottomWidth: 5,
    marginTop: 20,
    borderBottomColor: "#ddd",
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff', // Purple color
  },
  headerDescription: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  wrapper: {
    height: 250, // Increased swiper height
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A5ACD', // Purple shade
  },
  slideText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    backgroundColor: '#4B0082', // Purple color
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 5,
    margin: 15,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  icon: {
    marginBottom: 10,
  },
});

export default Ibadat;

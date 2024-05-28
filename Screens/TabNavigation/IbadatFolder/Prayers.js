import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import app from "../../FirebaseFolder/Firebase"; // Ensure you have your Firebase app configuration here
import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrayersScreen() {
  const [PrayersDetails, setPrayersDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayers = async () => {
      try {
        const storedPrayers = await AsyncStorage.getItem('PrayersDetails');
        if (storedPrayers) {
          setPrayersDetails(JSON.parse(storedPrayers));
          setLoading(false);
        }

        const db = getDatabase(app);
        const dbref = ref(db, "Prayers");
        onValue(dbref, async (snapshot) => {
          const data = snapshot.val();
          setPrayersDetails(data);
          await AsyncStorage.setItem('PrayersDetails', JSON.stringify(data));
          setLoading(false);
        });
      } catch (error) {
        console.error('Failed to fetch prayers data:', error);
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  const customSort = (prayers) => {
    const order = ["Fajar", "Dhuhr", "Asr", "Maghrib", "Isha"];
    return prayers.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  };

  const renderItem = (prayer) => (
    <View style={styles.item}>
      <Text style={styles.title}>{prayer.name}</Text>
      <Text style={styles.text}>{prayer.description}</Text>
      {prayer.times && (
        <>
          <Text style={styles.text}>Start: {prayer.times.start}</Text>
          <Text style={styles.text}>End: {prayer.times.end}</Text>
        </>
      )}
      {prayer.rakats && (
        <>
          <Text style={styles.text}>Sunnah Rakats: {prayer.rakats.sunnah}</Text>
          <Text style={styles.text}>Fard Rakats: {prayer.rakats.fard}</Text>
          {prayer.rakats.sunnahAfter && <Text style={styles.text}>Sunnah After: {prayer.rakats.sunnahAfter}</Text>}
          {prayer.rakats.witr && <Text style={styles.text}>Witr: {prayer.rakats.witr}</Text>}
        </>
      )}
      <Text style={styles.text}>How to Offer:</Text>
      {prayer.howToOffer && prayer.howToOffer.steps.map((step, index) => (
        <Text key={index} style={styles.text}>- {step}</Text>
      ))}
      {prayer.dua && (
        <>
          <Text style={styles.text}>Before Dua:{"\n"} {prayer.dua.before}</Text>
          <Text style={styles.text}>After Dua:{"\n"} {prayer.dua.after}</Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Prayers Details</Text>
      <Text style={styles.description}>
        Below are the details of the daily prayers, including the times, rakats, and how to offer them.
      </Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <Swiper loop={false} showsPagination={false}>
          {customSort(Object.keys(PrayersDetails || {}).map(key => ({
            name: key,
            ...PrayersDetails[key]
          }))).map((prayer, index) => (
            <View key={index}>
              {renderItem(prayer)}
            </View>
          ))}
        </Swiper>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple', // Light gray background
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26, // Increased font size
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18, // Increased font size
    color: '#ffffff', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#6a0dad', // Purple background
    padding: 10,
    marginVertical: 2,
    borderRadius: 8,
    shadowColor: '#fffff', // Box shadow
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    // elevation: 5, // Android shadow
  },
  title: {
    fontSize: 26, // Increased font size
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginBottom: 10,
  },
  text: {
    fontSize: 18, // Increased font size
    color: '#ffffff', // White text
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 20, // Increased font size
    color: '#ffffff', // White text
    textAlign: 'center',
    marginTop: 20,
  }
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import app from "./Firebase"; // Import the functions you need from the SDKs you need
import { getDatabase, ref, onValue } from "firebase/database";

export default function PrayersScreen() {
  const [PrayersDetails, setPrayersDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase(app);
    const dbref = ref(db, "Prayers");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      setPrayersDetails(data);
      setLoading(false);
    });
  }, []);

  const customSort = (prayers) => {
    const order = ["Fajar", "Dhuhr", "Asr", "Maghrib", "Isha"];
    return prayers.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  };

  const renderItem = (prayer) => (
    <View style={styles.item}>
      <Text style={styles.title}>{prayer.name}</Text>
      <Text>{prayer.description}</Text>
      {prayer.times && (
        <>
          <Text>Start: {prayer.times.start}</Text>
          <Text>End: {prayer.times.end}</Text>
        </>
      )}
      {prayer.rakats && (
        <>
          <Text>Sunnah Rakats: {prayer.rakats.sunnah}</Text>
          <Text>Fard Rakats: {prayer.rakats.fard}</Text>
          {prayer.rakats.sunnahAfter && <Text>Sunnah After: {prayer.rakats.sunnahAfter}</Text>}
          {prayer.rakats.witr && <Text>Witr: {prayer.rakats.witr}</Text>}
        </>
      )}
      <Text>How to Offer:</Text>
      {prayer.howToOffer && prayer.howToOffer.steps.map((step, index) => (
        <Text key={index}>- {step}</Text>
      ))}
      {prayer.dua && (
        <>
          <Text>Before Dua: {prayer.dua.before}</Text>
          <Text>After Dua: {prayer.dua.after}</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

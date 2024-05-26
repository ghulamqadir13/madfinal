import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from "./Firebase"; // Import the functions you need from the SDKs you need
import { getDatabase, ref, onValue } from "firebase/database";

const HajjDuaScreen = () => {
  const [HajjDuaDetails, setHajjDuaDetails] = useState([]);

  const orderedKeys = [
    "entering_ihram",
    "entering_makkah",
    "seeing_kaaba",
    "tawaf_start",
    "between_rukn_yamani_and_black_stone",
    "after_completing_tawaf",
    "safa_and_marwah",
    "standing_at_arafat",
    "at_muzdalifah",
    "stoning_jamarat",
    "sacrifice_animal",
    "haircut_or_shave"
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('HajjDuaDetails');
        if (storedData) {
          setHajjDuaDetails(JSON.parse(storedData));
        } else {
          fetchDataFromFirebase();
        }
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    const fetchDataFromFirebase = () => {
      const db = getDatabase(app);
      const dbref = ref(db, 'hajj_duas');
      onValue(dbref, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const orderedData = orderedKeys.map(key => ({
            key,
            ...data[key]
          }));
          setHajjDuaDetails(orderedData);
          try {
            await AsyncStorage.setItem('HajjDuaDetails', JSON.stringify(orderedData));
          } catch (error) {
            console.error("Error saving data", error);
          }
        }
      });
    };

    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.arabic}>{item.arabic}</Text>
      <Text style={styles.transliteration}>{item.transliteration}</Text>
      <Text style={styles.translation}>{item.translation}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Hajj Dua Details</Text>
      <Text style={styles.description}>
        Below are the details of Hajj duas, including the prayers in Arabic, their transliteration, and translation.
      </Text>
      <FlatList
        data={HajjDuaDetails}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple', // Light gray background
    padding: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ffffff', // White text
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ffffff', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#6a0dad', // Purple background
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginBottom: 10,
  },
  arabic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dcdcdc', // Light gray text
    marginBottom: 5,
  },
  transliteration: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#ffffff', // White text
    marginBottom: 5,
  },
  translation: {
    fontSize: 14,
    color: '#ffffff', // White text
  },
});

export default HajjDuaScreen;

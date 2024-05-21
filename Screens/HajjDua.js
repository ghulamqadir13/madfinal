import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native';
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
    const db = getDatabase(app);
    const dbref = ref(db, 'hajj_duas');
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const orderedData = orderedKeys.map(key => ({
          key,
          ...data[key]
        }));
        setHajjDuaDetails(orderedData);
      }
    });
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
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  arabic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginBottom: 5,
  },
  transliteration: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5,
  },
  translation: {
    fontSize: 14,
    color: '#333',
  },
});

export default HajjDuaScreen;

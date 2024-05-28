import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../../FirebaseFolder/Firebase'; // Ensure you have your Firebase app configuration here

const NamazJanazaDuaScreen = () => {
  const [NamazaJanazaDuaDetails, setNamazaJanazaDuaDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('NamazaJanazaDuaDetails');
        if (storedData) {
          setNamazaJanazaDuaDetails(JSON.parse(storedData));
          setLoading(false);
        } else {
          fetchDataFromFirebase();
        }
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    const fetchDataFromFirebase = () => {
      const db = getDatabase(app);
      const dbref = ref(db, "namaz_e_janaza_duas");
      onValue(dbref, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const duaDetails = Object.values(data);
          setNamazaJanazaDuaDetails(duaDetails);
          try {
            await AsyncStorage.setItem('NamazaJanazaDuaDetails', JSON.stringify(duaDetails));
          } catch (error) {
            console.error("Error saving data", error);
          }
        }
        setLoading(false);
      });
    };

    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.arabic}>{item.arabic}</Text>
      <Text style={styles.transliteration}>{item.transliteration}</Text>
      <Text style={styles.translation}>{item.translation}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Namaz-e-Janaza Dua Details</Text>
      <Text style={styles.description}>
        Below are the details of Namaz-e-Janaza duas, including the prayers in Arabic, their transliteration, and translation.
      </Text>
      <FlatList
        data={NamazaJanazaDuaDetails}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'purple', // Light gray background
    marginTop: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ffffff', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#6a0dad', // Purple background
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // White text
    marginBottom: 10,
  },
  arabic: {
    fontSize: 16,
    color: '#dcdcdc', // Light gray text
    marginBottom: 10,
  },
  transliteration: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#ffffff', // White text
    marginBottom: 10,
  },
  translation: {
    fontSize: 14,
    color: '#ffffff', // White text
  },
});

export default NamazJanazaDuaScreen;
